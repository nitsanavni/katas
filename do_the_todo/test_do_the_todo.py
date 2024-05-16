import openai
from filecache import filecache

import pytest
import tempfile
from approvaltests import verify, Options
from approvaltests.inline.inline_options import InlineOptions


@pytest.fixture
def temp_file():
    with tempfile.NamedTemporaryFile(
        mode="r",
        dir=".",
        prefix="tmp_",
        suffix=".py",
    ) as temp_file:
        yield temp_file.name


@filecache(1e9)
def prompt(text: str, sample=0):
    return (
        openai.chat.completions.create(
            model="gpt-4o", messages=[{"role": "user", "content": text}]
        )
        .choices[0]
        .message.content
    )


def test_prompt():
    """
    Who's there?
    """
    verify(
        prompt("knock knock"),
        options=Options().inline(InlineOptions.semi_automatic()),
    )


def do_the_todo_prompt(code: str):
    return f"""<task>Do **just** the TODO in the following code.</task>
<response_format>
Thoughts:
{{your thoughts here}}
Code:
{{your code here}}
</response_format>
<constraint>no code comments</constraint>
<constraint>don't leave the TODO itself in the code</constraint>
<code>{code}</code>"""


def strip_response(response: str) -> str:
    return "\n".join(
        [
            l.replace("<code>", "").replace("</code>", "")
            for l in response.split("Code:\n")[1].splitlines()
            if "```" not in l
        ]
    )


def do_the_todo(code: str, sample=0) -> str:
    return strip_response(prompt(do_the_todo_prompt(code), sample))


def test_do_the_todo():
    """
    def generate_greeting(x):
        return f"Hello, {x}!"
    def greet_person(x):
        return f"Hello, {x}!"

    def greet_user(x):
        return f"Hello, {x}!"

    def generate_greeting(x):
        return f"Hello, {x}!"

    def generate_greeting(x):
        return f"Hello, {x}!"
    """
    code = """# TODO: give a better name to this function
def applesauce(x):
    return f"Hello, {x}!"
"""
    verify(
        "\n".join([do_the_todo(code, sample) for sample in range(5)]),
        options=Options().inline(InlineOptions.semi_automatic()),
    )
