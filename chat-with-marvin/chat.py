#!/usr/bin/env python

import sys
import marvin
import random
import subprocess

marvin.settings.llm_model = "openai/gpt-4-1106-preview"
marvin.settings.llm_temperature = 0


def execute_code(code, program=["python", "-c"]) -> str:
    print(f"executing code with {program}", file=sys.stderr)
    print(code, file=sys.stderr)
    output = subprocess.check_output(
        program + [code], stderr=subprocess.STDOUT, text=True
    )
    print("output", file=sys.stderr)
    print(output, file=sys.stderr)
    return output


@marvin.tools.tool
def python(python_script: str) -> str:
    """
    Executes **python** code and returns the output.
    Output should ve printed to stdout.
    """
    return execute_code(python_script)


@marvin.tools.tool
def bash(bash_script: str) -> str:
    """
    Executes **bash** code and returns the output.
    """
    return execute_code(bash_script, program=["bash", "-c"])


@marvin.tools.tool
def jq(jq_script: str) -> str:
    """
    Executes **jq** code and returns the output.
    Using `jq -nr {code}`
    """
    return execute_code(jq_script, program=["jq", "-nr"])


chat = marvin.AIApplication(
    description="An AI that loves to chat and code.", tools=[python]
)


def get_user_input():
    return input("> ")


def unquote(s):
    return s if s[0] != '"' else s[1:-1]


while True:
    print(unquote(chat(get_user_input()).content).encode().decode("unicode_escape"))
