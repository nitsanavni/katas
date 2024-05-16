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
<code>{code}</code>"""


def do_the_todo(code: str):
    return prompt(do_the_todo_prompt(code))


def test_do_the_todo():
    """
    Thoughts:
    The function name `applesauce` is not descriptive of what the function does. A better name should reflect its purpose, which is to greet a user by name.
    
    Code:
    ```python
    # Changed the function name to better represent its purpose
    def greet_user(x):
        return f"Hello, {x}!"
    ```
    ***** DELETE ME TO APPROVE *****
    """
    code = """# TODO: give a better name to this function
def applesauce(x):
    return f"Hello, {x}!"
"""
    verify(do_the_todo(code), options=Options().inline(InlineOptions.semi_automatic()))
