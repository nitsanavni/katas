#!/usr/bin/env python

import marvin
import sys

marvin.settings.llm_model = "openai/gpt-4-1106-preview"
# marvin.settings.llm_model = "openai/gpt-3.5-turbo-1106"


@marvin.ai_fn
def implement(function_signature: str, doc_string: str = None) -> str:
    """
    complete the implementation of the function according to te given signature
    respond with the complete source code of the function exactly, no wrapping in quotes
    """


if __name__ == "__main__":
    code = implement(
        "def print_numbers(start=1, end=10) -> None:",
        """one number per line
except for the numbers that are multiples of 3, in which case print Gonzo instead
and numbers that are multiples of 5, in which case print Grease instead
for numbers that are multiples of both 3 and 5, print Bloch instead""",
    )
    print(code, file=sys.stderr)
    exec(
        f"""
{code}
print_numbers(1, 35)
    """
    )
