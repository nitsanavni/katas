#!/usr/bin/env python

import marvin
import sys
import time


def change_model_based_on_cli_flag():
    args = sys.argv
    model = "gpt-3.5-turbo-1106" if "-4" not in args else "gpt-4-1106-preview"
    marvin.settings.llm_model = f"openai/{model}"


change_model_based_on_cli_flag()


@marvin.ai_fn
def implement(function_signature: str, doc_string: str = None) -> str:
    """
    complete the implementation of the function according to te given signature
    respond with the complete source code of the function exactly, no wrapping in quotes
    """


if __name__ == "__main__":
    start_time = time.time()
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
    print(f"--- {time.time() - start_time} seconds ---", file=sys.stderr)
