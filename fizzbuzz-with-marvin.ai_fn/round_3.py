#!/usr/bin/env python

import marvin

marvin.settings.llm_model = "openai/gpt-4-1106-preview"
# marvin.settings.llm_model = "openai/gpt-3.5-turbo-1106"


@marvin.ai_fn
def implement(function_signature: str, doc_string: str = None) -> str:
    """
    complete the implementation of the function according to te given signature
    respond with the complete source code of the function exactly, no wrapping in quotes
    """


if __name__ == "__main__":
    exec(
        f"""
{implement("def print_numbers(start=1, end=25) -> None:", "one number per line")}
print_numbers()
    """
    )
