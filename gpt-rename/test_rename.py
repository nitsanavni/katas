from rope.base.project import Project
from rope.refactor.rename import Rename
from approvaltests import verify, Options
from approvaltests.reporters.reporter_that_automatically_approves import (
    ReporterThatAutomaticallyApproves as Auto,
)
import re
import os
import shutil
import subprocess
from pathlib import Path


scrub_pytest_duration = lambda s: re.sub(r"0\.\d+s", "🙈", s)
auto_inline = (
    lambda: Options().with_reporter(Auto()).inline().add_scrubber(scrub_pytest_duration)
)


def sandbox(*, files, name):
    class Sandbox:
        def __init__(self, files, name):
            self.name = name
            self.files = files
            self.output = None

        def __enter__(self):
            os.makedirs(self.name, exist_ok=True)

            for filename, content in self.files:
                full_filename = f"{self.name}/{filename}"
                path = Path(full_filename)
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(content)

            def read_file(filename):
                def r():
                    with open(f"{self.name}/{filename}", "r") as file:
                        return file.read()

                return r

            for filename, content in self.files:
                setattr(self, filename.replace(".", "_"), read_file(filename))

            return self

        def __exit__(self, *args):
            shutil.rmtree(self.name)

        def exec(self, command):
            self.output = subprocess.run(
                command,
                shell=True,
                cwd=self.name,
                capture_output=True,
                text=True,
            ).stdout

            return self.output

        def pytest(self):
            assert self.exec("pytest -q").find("fail") == -1

        def offset(self, name):
            project = Project(self.name)
            for file in sorted(project.get_python_files(), key=lambda f: f.path):
                match = re.search(rf"\b{name}\b", file.read())
                if match:
                    return file.path, match.start()

        def rename(self, original_name, new_name):
            project = Project(self.name)
            offset = self.offset(original_name)
            if offset:
                path, offset = offset
                rename = Rename(
                    project, project.get_resource(path), offset
                ).get_changes(new_name)
                project.do(rename)

        def git_add(self):
            return self.exec("git init && git add .")

        def git_diff(self):
            return self.exec(
                "git diff | grep -v 'index' | grep -v \\+\\+\\+ | grep -v '\-\-\-'"
            )

    return Sandbox(files=files, name=name)


def test_create_temp_project():
    """
    .                                                                        [100%]
    1 passed in 🙈
    """
    files = [
        (
            "hiker.py",
            """def answer():
    return 42
""",
        ),
        (
            "test_hiker.py",
            """from hiker import answer
from approvaltests import verify, Options


def test_answer():
    '''
    42
    '''
    verify(answer(), options=Options().inline())
""",
        ),
    ]
    with sandbox(files=files, name="simple_project") as s:
        verify(
            s.exec("pytest -q"),
            options=auto_inline(),
        )
        assert "from hiker import answer" == s.test_hiker_py().splitlines()[0]


hiker_project_files = [
    (
        "src/hiker.py",
        "def answer():\n    return 42\n",
    ),
    (
        "test/test_hiker.py",
        "from hiker import answer\ndef test_answer():\n    assert 42 == answer()\n",
    ),
    (
        "pytest.ini",
        "[pytest]\npythonpath = src\n",
    ),
    (
        ".gitignore",
        "__pycache__/\n",
    ),
]


def test_find_offset():
    """
    [('src/hiker.py', 4), ('test/test_hiker.py', 29)]
    """
    with sandbox(files=hiker_project_files, name="offsets") as s:
        verify(
            [s.offset(word) for word in ["answer", "test_answer"]],
            options=auto_inline(),
        )


def test_rename():
    """
    diff --git a/src/hiker.py b/src/hiker.py
    @@ -1,2 +1,2 @@
    -def answer():
    +def balloon():
         return 42
    diff --git a/test/test_hiker.py b/test/test_hiker.py
    @@ -1,3 +1,3 @@
    -from hiker import answer
    +from hiker import balloon
     def test_answer():
    -    assert 42 == answer()
    +    assert 42 == balloon()
    """
    with sandbox(files=hiker_project_files, name="rename_it") as s:
        s.pytest()
        s.git_add()

        s.rename("answer", "balloon")

        s.pytest()
        verify(
            s.git_diff(),
            options=auto_inline(),
        )
