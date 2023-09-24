#!/usr/bin/env python3

import pexpect


def gpt_decide_to_add(git_add_current_hunk: str) -> bool:
    # This function simulates ChatGPT's decision.
    if "TODO" in git_add_current_hunk:
        print("TODO detected, not adding")
        return False
    print("No TODO detected, adding")
    return True


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
