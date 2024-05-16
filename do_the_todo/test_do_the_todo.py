import openai

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

def test_temp_file(temp_file):
    assert temp_file == "aldsg"
