#!/usr/bin/env python

import asyncio
import marvin
from pydantic import BaseModel

# marvin.settings.llm_model = "openai/gpt-4-1106-preview"
marvin.settings.llm_model = "openai/gpt-3.5-turbo-1106"
marvin.settings.llm_temperature = 0


@marvin.ai_fn
async def number_transformation(n: int) -> str:
    """
    transform numbers to strings
    the rule of the transformation is: return the string representation of the number itself
    exceptions to the rule, for numbers [3, 6, 9, ...] and [5, 10, 15, ...]:
        if the number is divisible by 3 transform it to "Bingo" instead.
        if the number is divisible by 5 transform it to "Combo" instead.
        if the number is both divisible by 3 and divisible by 5 transform it to "CottonField" instead.
    """


async def format_transformation(n: int) -> str:
    return f"{n} -> {await number_transformation(n)}"


async def run_transformations_concurrently(up_to):
    tasks = [format_transformation(n) for n in range(1, up_to + 1)]
    return await asyncio.gather(*tasks)


if __name__ == "__main__":
    results = asyncio.run(run_transformations_concurrently(up_to=25))
    print("\n".join(results))
