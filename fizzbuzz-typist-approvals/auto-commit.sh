#!/bin/bash

# Stage all changes from the current working directory for commit
git add .

# Generate a commit message using a shorthand script
msg=$(git diff --cached | chat "Short commit msg, max 50 chars, 6 words using AI.")

# Check if the message is empty
if [ -z "$msg" ]; then
    echo "No message generated, aborting."
    exit 1
fi

# Commit and push
git commit -m "$msg"
git push
