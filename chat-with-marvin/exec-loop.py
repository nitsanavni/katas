#!/usr/bin/env python

import sys
import marvin
import pexpect
import time
from python_shell import PythonShell

marvin.settings.llm_model = "openai/gpt-4"
marvin.settings.llm_temperature = 0

python_shell = PythonShell()


@marvin.tools.tool
def send_code_to_python_shell(multi_line_python_code: str) -> str:
    """
    Sends code (multi-line) to a python shell and returns the shell output.
    Don't use print statements in your code, just:
    a = 1
    a
    """
    result = python_shell.send(multi_line_python_code)
    print(result, file=sys.stderr)
    return result


chat = marvin.AIApplication(
    description="""
solve the user request by executing python code in a python shell
use very small steps
the user input is sent once
from then on, we only send ""
make sure the request was fulfilled, only then respond with exactly `done!`

because we're running like this:

print(chat(get_user_input()).content)

while True:
    content = chat("").content
    print(content)
    if content == "done!":
        break
""",
    tools=[send_code_to_python_shell],
)


def get_user_input():
    return " ".join(sys.argv[1:])


print(chat(get_user_input()).content)

while True:
    content = chat("").content
    print(content)
    if content == "done!":
        break


python_shell.close()
