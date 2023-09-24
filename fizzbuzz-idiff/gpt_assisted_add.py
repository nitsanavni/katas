#!/usr/bin/env python3

import argparse
from chat import chat
import pexpect

# We'll now fill this from the CLI args
CRITERIA = []


def load_prompt_template(file_name: str) -> str:
    with open(file_name, 'r') as f:
        return f.read()


def gpt_decide_to_add(git_add_current_hunk: str, criteria=CRITERIA) -> bool:
    criteria_text = '\n'.join([f"  - {c}" for c in criteria])

    template = load_prompt_template('gpt_assisted_add_prompt.template')
    prompt = template.format(criteria_text=criteria_text,
                             git_add_current_hunk=git_add_current_hunk)

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


def main():
    parser = argparse.ArgumentParser(description="GPT assisted git add -p")
    parser.add_argument('-c', '--criterion', action='append', help='Criteria to consider when deciding to stage a hunk')

    args = parser.parse_args()

    if args.criterion:
        CRITERIA.extend(args.criterion)

    spawn_git_add_p()
    continuously_check_for_prompt()
    print("Done!")


if __name__ == '__main__':
    main()
