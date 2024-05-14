from typing import List
from filecache import filecache
import openai
import subprocess
import os
import tempfile
from approvaltests import verify, Options
from approvaltests.inline.inline_options import InlineOptions

semi = Options().inline(InlineOptions().semi_automatic())


@filecache(1e9)
def chat(messages: List, sample=0):
    return (
        openai.chat.completions.create(model="gpt-4o", messages=messages)
        .choices[0]
        .message.content
    )


def test_chat():
    """
    Hello! How can I assist you today?
    """
    verify(
        chat(
            messages=[
                {"role": "user", "content": "Hello!"},
            ]
        ),
        options=semi,
    )


def exec(command):
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    return result.stdout, result.stderr, result.returncode


def test_exec():
    """
    Hello, world!
    """
    verify(exec("printf 'Hello, world!'")[0], options=semi)
    verify(exec("printf 'Hello, world!' 1>&2")[1], options=semi)


class Plan:
    def __init__(self, file=None):
        self.file = file
        if None == self.file:
            self.file = tempfile.NamedTemporaryFile(
                mode="w+", prefix="tmp_plan_", suffix=".md", dir="."
            )
        if os.stat(self.file.name).st_size == 0:
            self.file.write("** empty plan **")

    def __del__(self):
        self.file.close()

    def __str__(self) -> str:
        self.file.seek(0)
        return self.file.read()

    def add(self, task):
        self.file.seek(0)
        content = self.file.read()
        self.file.seek(0)
        if content == "** empty plan **":
            self.file.truncate(0)
            self.file.write(f"- [ ] **{task}**")
        else:
            self.file.write(f"{content}\n- [ ] **{task}**")


def test_empty_plan():
    """
    ** empty plan **
    """
    plan = Plan()
    verify(plan, options=semi)


def test_add_to_plan():
    """
    - [ ] **get the date**
    """
    plan = Plan()
    plan.add("get the date")
    verify(plan, options=semi)
