#!/usr/bin/env python3

import pexpect

def gpt_decide_to_add(git_add_current_hunk: str) -> bool:
    # This function simulates ChatGPT's decision.
    if "TODO" in git_add_current_hunk:
        print("TODO detected, not adding")
        return False
    print("No TODO detected, adding")
    return True

# Start the 'git add -p' subprocess using pexpect
child = pexpect.spawn('git add -p')

# Continuously check for the git add -p prompt
while True:
    index = child.expect(["Stage this hunk", pexpect.EOF, pexpect.TIMEOUT], timeout=60)

    # If the prompt is found
    if index == 0:
        child.sendline('s')  # send 's' to split the hunk
        
        # Wait for a moment to let the split take effect
        # Note: Depending on the size/complexity of the hunk, 
        # you may need to adjust the timeout or add more logic to handle cases where the hunk cannot be split.
        child.expect(["Stage this hunk", pexpect.EOF, pexpect.TIMEOUT], timeout=5)

        current_hunk = child.before.decode()  # This gives us the hunk's text
        
        # Decide whether to add the hunk
        if gpt_decide_to_add(current_hunk):
            child.sendline('y')  # send 'y' to stage the hunk
        else:
            child.sendline('n')  # send 'n' to not stage the hunk

    # If EOF or TIMEOUT was detected
    else:
        break

print("Done!")