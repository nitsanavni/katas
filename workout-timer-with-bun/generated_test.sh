#!/bin/bash

# Start a tmux session in detached mode to run bun app.js
tmux new-session -d -s test_app "bun app.js"

# Wait briefly to ensure the session starts
sleep 1

# Initialize a flag to track if any comparison fails
any_failure=0

# Wait for 1 second(s) before next action
sleep 1
# Capture the output in test_app.hello.received
tmux capture-pane -t test_app -p | sed '/^$/d' > test_app.hello.received

# Touch the approved frame file test_app.hello.approved
touch test_app.hello.approved
# Compare received and approved frames for hello
if ! diff test_app.hello.received test_app.hello.approved > /dev/null; then
    echo "Frames do not match for hello."
    any_failure=1  # Flag that a failure occurred
fi

# Kill the tmux session after test
tmux kill-session -t test_app
if [ $any_failure -ne 0 ]; then
    echo "At least one frame did not match. Launching vimdiff for each failure."
    if ! diff test_app.hello.received test_app.hello.approved > /dev/null; then
        vim -d test_app.hello.received test_app.hello.approved
    fi
    exit 1
fi
echo "All frames verified successfully."
exit 0
