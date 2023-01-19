#!/bin/bash

# This script takes a file name as an argument
file=$1

# Eval the script and capture its stdout
stdout=$(bash $file 2>&1)

# Read the file line by line
while read -r line; do
    # Print each line of the script
    echo "script: $line"
    # Check if the line starts with ": 'verify"
    if [[ $line =~ ^\:.* ]]; then
        echo "stdout:"
        echo "$stdout"
    fi
done < "$file"
