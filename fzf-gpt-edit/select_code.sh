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

# Display the selected range from the file
SELECTED_CODE=$(sed -n "${START_LINE},${END_LINE}p" "$SELECTED_FILE")
echo 'What change do you want?'
read EDIT_TO_CODE
echo "You want: $EDIT_TO_CODE"

./chat "explain this code in a few words\n${SELECTED_CODE}"
