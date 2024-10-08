#!/bin/bash

# Start a tmux session in detached mode to run bash --norc --noprofile
tmux new-session -d -s test_fizzbuzz_cli "bash --norc --noprofile"

# Wait briefly to ensure the session starts
sleep 1

# Initialize a flag to track if any comparison fails
any_failure=0

# Send the command: export PS1='$ ' && clear
tmux send-keys -t test_fizzbuzz_cli 'export PS1='$ ' && clear' Enter
# Send the command: seq 10 | ./fizzbuzz 3 Fizz 5 Buzz
tmux send-keys -t test_fizzbuzz_cli 'seq 10 | ./fizzbuzz 3 Fizz 5 Buzz' Enter
# Wait for 1 second(s) before next action
sleep 1
# Capture the output in test_fizzbuzz_cli.fizzbuzz.received
tmux capture-pane -t test_fizzbuzz_cli -p | sed '/^$/d' > test_fizzbuzz_cli.fizzbuzz.received

# Touch the approved frame file test_fizzbuzz_cli.fizzbuzz.approved
touch test_fizzbuzz_cli.fizzbuzz.approved
# Compare received and approved frames for fizzbuzz
if ! diff test_fizzbuzz_cli.fizzbuzz.received test_fizzbuzz_cli.fizzbuzz.approved > /dev/null; then
    echo "Frames do not match for fizzbuzz."
    any_failure=1  # Flag that a failure occurred
fi

# Kill the tmux session after test
tmux kill-session -t test_fizzbuzz_cli
if [ $any_failure -ne 0 ]; then
    echo "At least one frame did not match. Launching vimdiff for each failure."
    if ! diff test_fizzbuzz_cli.fizzbuzz.received test_fizzbuzz_cli.fizzbuzz.approved > /dev/null; then
        vim -d test_fizzbuzz_cli.fizzbuzz.received test_fizzbuzz_cli.fizzbuzz.approved
    fi
    exit 1
fi
echo "All frames verified successfully."
exit 0
