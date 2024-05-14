from typing import List
from filecache import filecache
import openai
import subprocess
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
