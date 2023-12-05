#!/usr/bin/env python

import marvin
import subprocess
import sys


marvin.settings.llm_model = "openai/gpt-4-1106-preview"


@marvin.tools.tool
def exec_python_code(code: str) -> str:
    """
    Execute python code and returns stdout
    Code sould use print statements to return output
    """
    print(code)
    stdout, stderr = subprocess.Popen(
        ["python", "-c", code],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    ).communicate()

    print(stdout)
    print(stderr)
    return stdout.decode("utf-8")


chat = marvin.AIApplication(
    name="problem solver",
    description="""an assitant that helps solving problems
    defers to python for all tasks
    works in very small steps
    reports back to the user after each step
    remembers file names""",
    tools=[exec_python_code],
)


def user_query():
    return " ".join(sys.argv[1:])


if __name__ == "__main__":
    query = user_query()
    print(query)
    print(chat(query))
    print(chat)
    print(chat.state)
    print(chat.plan)
