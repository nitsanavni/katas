#!/usr/bin/env python

import marvin

marvin.settings.llm_model = "openai/gpt-4-1106-preview"


@marvin.ai_fn
def numbers_1_to_100() -> list[str]:
    pass


def main():
    print("\n".join(numbers_1_to_100()))


if __name__ == "__main__":
    main()
