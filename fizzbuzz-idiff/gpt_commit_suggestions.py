#!/usr/bin/env python3

import sys
from chat import chat


def load_prompt_template(file_name: str) -> str:
    with open(file_name, "r") as f:
        return f.read()


def gpt_suggest_commits(git_diff: str) -> list:
    template = load_prompt_template("gpt_commit_suggestions.template")
    prompt = template.format(git_diff=git_diff)

    response = chat(prompt)
    # Split the response by newline to handle multiple commit messages
    suggested_commits = response.strip().split("\n")

    return suggested_commits


def main():
    # Read diff from stdin
    diff = sys.stdin.read()

    # Get suggested commit messages from GPT
    suggested_commits = gpt_suggest_commits(diff)

    for commit_msg in suggested_commits:
        print(commit_msg)


if __name__ == "__main__":
    main()
