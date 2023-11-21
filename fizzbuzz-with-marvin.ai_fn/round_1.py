#!/usr/bin/env python

import marvin

marvin.settings.llm_model = "openai/gpt-4-1106-preview"
marvin.settings.llm_temperature = 0


@marvin.ai_fn
def numbers_1_to_25_with_exceptions() -> list[str]:
    """
    Returns a list of number transformations from 1 to 25 as strings.
    each number is transformed
    the rule is that the transformation returns the number itself (identity)
    exceptions to the rule, for numbers 3, 5, 6, 9 and 10:
        if the number is either exactly 3, exactly 6 or exactly 9 transform it to "Bingo" instead.
        if the number is either exactly 5 or exactly 10 transform it to "Combo" instead.

    follow this element format examples: "1 -> 1", "2 -> 2", "3 -> Bingo"

    """


def main():
    print("\n".join(numbers_1_to_25_with_exceptions()))


if __name__ == "__main__":
    main()
