#!/bin/bash

# Stage all changes from the current working directory for commit
git add .

# Generate a commit message using the specified GPT model
msg=$(git diff --cached . | chat -m gpt-4o-mini "\n---\n\nWrite a **very short** commit msg, max 50 chars, max 6 words. Just the most important change.")

# Check if the message is empty
if [ -z "$msg" ]; then
    echo "No message generated, aborting."
    exit 1
fi

# Commit and push
git commit -m "$msg"
git push
