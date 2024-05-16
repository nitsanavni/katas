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
