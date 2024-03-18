from approvaltests import verify, Options
from approvaltests.reporters.reporter_that_automatically_approves import (
    ReporterThatAutomaticallyApproves as Auto,
)

auto_inline = lambda: Options().with_reporter(Auto()).inline()


def rename(*, code: str, original_name: str, new_name: str):
    return code.replace(original_name, new_name)


def test_rope_rename():
    """
    b = 0
    print(b)
    """
    code = """a = 0
print(a)
"""
    verify(rename(code=code, original_name="a", new_name="b"), options=auto_inline())


import os
import shutil
import subprocess
from pathlib import Path


def temporary_project(*, files, name):
    class TemporaryProject:
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

        def __str__(self):
            files = "\n\n".join(
                [
                    f"""{filename}
---
{content}"""
                    for filename, content in self.files
                ]
            )

            return f"""{self.name}

{files}

{self.output}"""

    return TemporaryProject(files=files, name=name)


def test_create_temp_project():
    """
    simple_project

    hiker.py
    ---
    def answer():
        return 42


    test_hiker.py
    ---
    from hiker import answer
    from approvaltests import verify, Options


    def test_answer():
        '''
        42
        '''
        verify(answer(), options=Options().inline())


    ============================= test session starts ==============================
    platform darwin -- Python 3.11.5, pytest-8.0.2, pluggy-1.4.0
    rootdir: /Users/nitsanavni/code/katas/gpt-rename/simple_project
    plugins: approvaltests-11.0.0, anyio-3.7.1
    collected 1 item

    test_hiker.py .                                                          [100%]

    ============================== 1 passed in 0.04s ===============================
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
    with temporary_project(files=files, name="simple_project") as project:
        project.exec("pytest")
        verify(project, options=auto_inline())
        assert "from hiker import answer" == project.test_hiker_py().splitlines()[0]


def test_rope_sees_our_file():
    """
    a = 0
    """
    files = [
        (
            "src/a.py",
            "a = 0",
        ),
    ]
    with temporary_project(files=files, name="rope_sees") as project:
        from rope.base.project import Project

        project = Project(project.name)

        verify(project.get_python_files()[0].read(), options=auto_inline())


def test_rope_rename_var():
    """
    b = 0
    print(b)
    """
    files = [
        (
            "src/script.py",
            "a = 0\nprint(a)\n",
        ),
    ]
    with temporary_project(files=files, name="rename_a_to_b") as project:
        from rope.base.project import Project
        from rope.refactor.rename import Rename

        project = Project(project.name)
        rename = Rename(project, project.get_python_files()[0], 1).get_changes("b")
        project.do(rename)

        verify(project.get_python_files()[0].read(), options=auto_inline())


def test_rope_rename_in_multiple_files():
    """
    def the_answer():
        return 42


    from hiker import the_answer
    def test_answer():
        assert 42 == the_answer()
    """
    files = [
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
    ]
    with temporary_project(
        files=files, name="rename_answer_to_the_answer"
    ) as temp_project:
        assert temp_project.exec("pytest").find("1 passed") != -1

        from rope.base.project import Project
        from rope.refactor.rename import Rename

        project = Project(temp_project.name)
        hiker = project.get_resource("src/hiker.py")
        test_hiker = project.get_resource("test/test_hiker.py")
        rename = Rename(project, hiker, 5).get_changes("the_answer")
        project.do(rename)

        assert temp_project.exec("pytest").find("1 passed") != -1

        verify(
            "\n\n".join([f.read() for f in [hiker, test_hiker]]),
            options=auto_inline(),
        )
