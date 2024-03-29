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
from openai import OpenAI
from filecache import filecache


openai = OpenAI()


scrub_pytest_duration = lambda s: re.sub(r"0\.\d+s", "🙈", s)
auto_inline = (
    lambda: Options().with_reporter(Auto()).inline().add_scrubber(scrub_pytest_duration)
)


class Sandbox:
    def __init__(self, files=None, name=None):
        self.name = name
        self.files = files
        self.output = None

    def with_name(self, name):
        self.name = name
        return self

    def from_path(self, path):
        self.src_path = path
        return self

    def __enter__(self):
        os.makedirs(self.name, exist_ok=True)

        if hasattr(self, "src_path"):
            shutil.copytree(self.src_path, self.name, dirs_exist_ok=True)

            return self

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
            rename = Rename(project, project.get_resource(path), offset).get_changes(
                new_name
            )
            project.do(rename)

    def cmd(self, command):
        self.rename(*self.parse(command))

    def parse(self, command):
        return re.match(r"/rename (\w+) to (\w+)", command).groups()

    def git_add(self):
        return self.exec("git init && git add .")

    def git_diff(self):
        return self.exec(
            "git diff | grep -v 'index' | grep -v \\+\\+\\+ | grep -v '\-\-\-'"
        )

    def code(self):
        project = Project(self.name)
        return "\n---\n\n".join(
            [
                f"{file.path}\n---\n{file.read()}"
                for file in sorted(project.get_python_files(), key=lambda f: f.path)
            ]
        )


def sandbox(*, files, name):
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
    diff --git a/src/jogger.py b/src/jogger.py
    @@ -1,2 +1,2 @@
    -def answer():
    +def my_function():
         return 42
    diff --git a/test/test_hiker.py b/test/test_hiker.py
    @@ -1,3 +1,3 @@
    -from hiker import answer
    -def test_answer():
    -    assert 42 == answer()
    +from jogger import my_function
    +def test_my_function():
    +    assert 42 == my_function()
    """
    with sandbox(files=hiker_project_files, name="rename_it") as s:
        s.pytest()
        s.git_add()

        s.rename("answer", "balloon")
        s.rename("balloon", "my_function")
        s.rename("hiker", "jogger")
        s.rename("test_answer", "test_my_function")

        s.pytest()
        verify(
            s.git_diff(),
            options=auto_inline(),
        )


def suggest_one_rename_prompt(s: Sandbox):
    return f"""<task>think about one single potential rename for the following code</task>
<format>/rename old to new</format>
<example>
<ex-code>def func(a, b):
    return a + b</ex-code>
<ex-output>/rename func to add</ex-output>
</example>
<code>{s.code()}</code>"""


@filecache(1e9)
def chat(prompt: str, sample=0):
    return (
        openai.chat.completions.create(
            model="gpt-4-turbo-preview", messages=[{"role": "user", "content": prompt}]
        )
        .choices[0]
        .message.content
    )


def test_chat():
    """
    Hello! How can I assist you today?
    """
    verify(
        chat("hello"),
        options=auto_inline(),
    )


def test_sandbox_code():
    """
    src/hiker.py
    ---
    def answer():
        return 42

    ---

    test/test_hiker.py
    ---
    from hiker import answer
    def test_answer():
        assert 42 == answer()
    """
    with sandbox(files=hiker_project_files, name="sandbox_code") as s:
        verify(
            s.code(),
            options=auto_inline(),
        )


def test_rename_prompt():
    """
    /rename answer to ultimate_answer
    /rename answer to get_answer
    /rename answer to ultimate_answer
    /rename answer to get_the_answer_to_everything
    /rename answer to ultimate_answer
    /rename answer to get_life_universe_everything_answer
    /rename answer to ultimate_answer
    /rename answer to get_the_answer_to_life_the_universe_and_everything
    """
    with sandbox(files=hiker_project_files, name="rename_prompt") as s:
        verify(
            "\n".join(
                [f"{chat(suggest_one_rename_prompt(s), sample)}" for sample in range(8)]
            ),
            options=auto_inline(),
        )


def test_rename_from_cmd():
    """
    diff --git a/src/hiker.py b/src/hiker.py
    @@ -1,2 +1,2 @@
    -def answer():
    +def ultimate_answer():
         return 42
    diff --git a/test/test_hiker.py b/test/test_hiker.py
    @@ -1,3 +1,3 @@
    -from hiker import answer
    +from hiker import ultimate_answer
     def test_answer():
    -    assert 42 == answer()
    +    assert 42 == ultimate_answer()
    """
    with sandbox(files=hiker_project_files, name="rename_from_cmd") as s:
        s.pytest()
        s.git_add()

        s.cmd("/rename answer to ultimate_answer")

        s.pytest()
        verify(
            s.git_diff(),
            options=auto_inline(),
        )


def test_rename_from_chat():
    files = [
        (".gitignore", "__pycache__/\n"),
        (
            "test_fizzbuzz.py",
            """from approvaltests import verify, Options
def fizzbuzz(n):
    return 'fizz' if n % 3 == 0 else str(n)
def test_fizzbuzz():
    '''
    1
    2
    fizz
    4
    5
    '''
    verify('\\n'.join([fizzbuzz(n) for n in range(1, 6)]), options=Options().inline())
""",
        ),
    ]
    with sandbox(files=files, name="rename_from_chat") as s:
        s.pytest()
        s.git_add()

        s.cmd(chat(suggest_one_rename_prompt(s), sample=2))

        s.pytest()
        # inline is not working here 🤷 🐛
        verify(s.git_diff(), options=Options().for_file.with_extension(".diff"))


def test_sandbox_from_existing_fs_project():
    """
    tennis6.py
    ---
    class TennisGame6:
        def __init__(self, player1Name, player2Name):
            self.player1Name = player1Name
            self.player2Name = player2Name
            self.player1Score = 0
            self.player2Score = 0

        def won_point(self, playerName):
    ....                                                                        [100%]
    1 passed in 🙈
    """
    with Sandbox().with_name("sandbox_from_existing_project").from_path(
        "../tennis-6"
    ) as s:
        verify(
            "\n".join(s.code().splitlines()[:10]) + "\n..." + s.exec("pytest -q"),
            options=auto_inline(),
        )


def test_suggest_a_few_renames_for_tennis6():
    with Sandbox().with_name("tennis6_suggestions").from_path("../tennis-6") as s:
        s.git_add()
        s.pytest()
        diffs = []

        for sample in range(8):
            prompt = suggest_one_rename_prompt(s)
            response = chat(prompt, sample)
            if response in diffs:
                continue
            diffs.append(response)
            s.cmd(response)
            s.pytest()
            diffs.append(s.git_diff())
            s.exec("git restore .")

        verify("---\n".join(diffs))
