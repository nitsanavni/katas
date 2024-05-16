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


def do_the_todo(code: str):
    return prompt(f"Do the TODO in the following code:\n{code}")

def test_do_the_todo():
    """
    Sure, here is the code with a more descriptive function name:
    
    ```python
    # Name the function to better reflect its purpose
    def greet_user(name):
        return f"Hello, {name}!"
    ``` 
    
    The new name `greet_user` makes it clear that the function is intended to greet a user by their name.
    ***** DELETE ME TO APPROVE *****
    """
    code = """# TODO: give a better name to this function
def applesauce(x):
    return f"Hello, {x}!"
"""
    verify(do_the_todo(code), options=Options().inline(InlineOptions.semi_automatic()))