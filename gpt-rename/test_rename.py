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
                with open(full_filename, "w") as file:
                    file.write(content)

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
