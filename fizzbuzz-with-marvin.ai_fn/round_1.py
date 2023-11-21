#!/usr/bin/env python

import marvin

marvin.settings.llm_model = "openai/gpt-4-1106-preview"
marvin.settings.llm_temperature = 0


@marvin.ai_fn
def numbers_1_to_25_with_exceptions() -> list[str]:
    """
    Returns a list of numbers from 1 to 25 as strings.
    exceptions to the rule, for numbers 3, 5, 6 and 9:
        if the number is either exactly 3, exactly 6 or exactly 9 return "Bingo" instead.
        if the number is exactly 5 return "Combo" instead.
    """


def main():
    print("\n".join(numbers_1_to_25_with_exceptions()))


if __name__ == "__main__":
    main()
