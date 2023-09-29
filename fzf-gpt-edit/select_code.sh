#!/bin/bash

# Use fzf to select a file
SELECTED_FILE=$(fzf --prompt="Select a file: ")

# Check if a file was selected
if [ -z "$SELECTED_FILE" ]; then
    echo "No file selected."
    exit 1
fi

# Display the selected file with line numbers and allow users to select the start
START_LINE=$(cat "$SELECTED_FILE" -n | fzf --layout=reverse --prompt="Select start: " | awk '{print $1}')

# Check if a start line was selected
if [ -z "$START_LINE" ]; then
    echo "No start line selected."
    exit 1
fi

# Display the file from the start line onwards and allow users to select the end
END_LINE=$(cat "$SELECTED_FILE" -n | tail -n +$START_LINE | fzf --layout=reverse --prompt="Select end: " | awk '{print $1}')

# Check if an end line was selected
if [ -z "$END_LINE" ]; then
    echo "No end line selected."
    exit 1
fi

SELECTED_CODE=$(sed -n "${START_LINE},${END_LINE}p" "$SELECTED_FILE")

echo 'What change/edit will it be?'
read EDIT_TO_CODE

# TODO: construct a prompt for gpt; provide 1. the task/main instruction (editing a file) 2. the specific edit requested 2.5. the output format: new code only to replace the prev 3. the line numbers selected 4. the full selected with line numbers 5. the selected section 
GPT_MODEL_RESPONSE=$(./chat "${EDIT_TO_CODE}\n${SELECTED_CODE}")

echo "GPT model response: $GPT_MODEL_RESPONSE"

# remove the selected lines from file
sed -i "${START_LINE},${END_LINE}d" "$SELECTED_FILE"

# insert the GPT model response at the second line
awk -v n=$START_LINE -v s="$GPT_MODEL_RESPONSE" 'NR == n {print s} {print}' "$SELECTED_FILE" > temp && mv temp "$SELECTED_FILE"