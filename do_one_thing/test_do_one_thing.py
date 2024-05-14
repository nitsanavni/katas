from typing import List
from filecache import filecache
import openai
import subprocess
import tempfile
import shutil
import os
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
    def __init__(self, file):
        self.file = file
        if os.stat(self.file.name).st_size == 0:
            self.file.write("** empty plan **")

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
    path = "tmp_plan.md"
    if os.path.exists(path):
        os.remove(path)
    plan = Plan(file=open(path, mode="w+"))
    verify(plan, options=semi)
    if os.path.exists(path):
        os.remove(path)


def test_add_to_plan():
    """
    - [ ] **get the date**
    """
    path = "tmp_plan_2.md"
    if os.path.exists(path):
        os.remove(path)
    plan = Plan(file=open(path, mode="w+"))
    plan.add("get the date")
    verify(plan, options=semi)
    if os.path.exists(path):
        os.remove(path)
