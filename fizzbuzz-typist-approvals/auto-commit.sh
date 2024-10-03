#!/bin/bash

# Stage all changes from the current working directory for commit
git add .

# Generate a commit message using the chat script
msg=$(git diff --cached | chat "please write a short commit message, max 50, max 6 words, use abbreviations")

# Check if the message is empty
if [ -z "$msg" ]; then
    echo "No message generated, aborting."
    exit 1
fi

# Commit and push
git commit -m "$msg"
git push
