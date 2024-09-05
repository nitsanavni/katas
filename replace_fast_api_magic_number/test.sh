#!/bin/bash

if [ -z "$1" ]; then
    set -- "example.py"
fi

# Check if the specified file exists
if [ ! -f "$1" ]; then
    echo "Error: The file '$1' does not exist."
    exit 1
fi

# Copy the original file to a temporary file for later comparison
original=$(mktemp)
cp "$1" "$original"

# Format the original file with Black
if ! black --quiet "$original" --line-length 79; then
    echo "Error: Failed to format '$1' with Black."
    exit 1
fi

# Transform the code using the replace script and save it to the formatted file
formatted=$(mktemp)
if ! python replace.py "$1" > "$formatted"; then
    echo "Error: Failed to run 'replace.py' on '$1'."
    exit 1
fi

# Format the transformed code with Black
if ! black --quiet --line-length 79 "$formatted"; then
    echo "Error: Failed to format transformed code with Black."
    exit 1
fi

# Compare the files and print differences
diff "$original" "$formatted"

# Cleanup temporary files
rm -f "$original" "$formatted"
