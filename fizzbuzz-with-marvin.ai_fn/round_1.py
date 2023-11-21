#!/usr/bin/env python

import marvin
from pydantic import BaseModel

marvin.settings.llm_model = "openai/gpt-4-1106-preview"
marvin.settings.llm_temperature = 0


class Transformation(BaseModel):
    n: int
    t: str

    def __str__(self):
        return f"{self.n} -> {self.t}"


@marvin.ai_fn
def number_transformations_1_to_25() -> list[Transformation]:
    """
    Returns a list of number transformations from 1 to 25.
    each number is transformed
    the rule is that the transformation returns the string representation of the number itself
    exceptions to the rule, for numbers [3, 6, 9, ...] and [5, 10, 15, ...]:
        (in case of conflict between exceptions, the first one is applied)
        if the number is divisible by 3 transform it to "Bingo" instead.
        if the number is divisible by 5 transform it to "Combo" instead.
    """


def main():
    print("\n".join(map(str, number_transformations_1_to_25())))


if __name__ == "__main__":
    main()
