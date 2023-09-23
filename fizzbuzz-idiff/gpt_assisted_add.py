#!/usr/bin/env python3

import subprocess

def gpt_decide_to_add(git_add_current_hunk: str) -> bool:
    # This is a placeholder function that simulates ChatGPT's decision.
    # You can replace this logic with an actual call to ChatGPT.
    if "TODO" in git_add_current_hunk:
        return False
    return True

# Start the 'git add -p' subprocess
process = subprocess.Popen(['git', 'add', '-p'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

current_hunk = []
while True:
    # Read a line of output from the subprocess
    output_line = process.stdout.readline()

    if not output_line:
        break

    # If the subprocess outputs the decision prompt, decide and send a response
    if "Stage this hunk [y,n,q,a,d,s,e,?]" in output_line:
        if gpt_decide_to_add("\n".join(current_hunk)):
            process.stdin.write('y\n')
            process.stdin.flush()
        else:
            process.stdin.write('n\n')
            process.stdin.flush()
        current_hunk = []
    else:
        current_hunk.append(output_line)

# Close stdin to signal to the subprocess that no more input will be provided
process.stdin.close()
process.wait()
