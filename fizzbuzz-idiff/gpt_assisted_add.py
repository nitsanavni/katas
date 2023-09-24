#!/usr/bin/env python3

from chat import chat
import pexpect


def gpt_decide_to_add(git_add_current_hunk: str) -> bool:
    prompt = (
        f"assess wheather to add the following hunk to the index\n"
        f"\n"
        f"!criteria for staging!:\n"
        f"  - does not contain the word TODO\n"
        f"\n"
        f"format: y/n\n"
        f"\n"
        f"hunk:\n"
        f"{git_add_current_hunk}\n"
    )

    response = chat(prompt)

    print(f"prompt: {prompt}")
    print(f"response: {response}")

    return "y" in response.lower()


child = None


def spawn_git_add_p():
    global child
    child = pexpect.spawn('git add -p')


def wait_for_prompt():
    index = child.expect(
        ["Stage this hunk", pexpect.EOF, pexpect.TIMEOUT], timeout=5)
    prompt_found = index == 0

    return prompt_found


def split_hunk():
    child.sendline('s')
    wait_for_prompt()


def stage_hunk():
    child.sendline('y')


def dont_stage_hunk():
    child.sendline('n')


def current_hunk():
    return child.before.decode()


def continuously_check_for_prompt():
    while wait_for_prompt():
        split_hunk()
        split_hunk()

        if gpt_decide_to_add(current_hunk()):
            stage_hunk()
        else:
            dont_stage_hunk()


spawn_git_add_p()
continuously_check_for_prompt()
print("Done!")
