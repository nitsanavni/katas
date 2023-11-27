#!/usr/bin/env python

import sys
import marvin

marvin.settings.llm_model = "openai/gpt-4-1106-preview"
marvin.settings.llm_temperature = 0


@marvin.ai_fn
def chat(user_input: str) -> str:
    """
    An AI that loves to chat.
    """


def user_input():
    return " ".join(sys.argv[1:])


def unquote(s):
    return s if s[0] != '"' else s[1:-1]


print(unquote(chat(user_input())))
