#!/bin/bash

# Read the input from stdin
input=$(cat)

# Check if the input contains triple backticks
if [[ $input == *\`\`\`* ]]; then
    # Split the input into lines
    IFS=$'\n' read -rd '' -a lines <<< "$input"

    # Initialize a variable to track if we are in a code block
    in_code_block=false
    code_block=""

    # Iterate over the lines
    for line in "${lines[@]}"; do
        # Check if the line is a code block delimiter
        if [[ $line == \`\`\`* ]]; then
            if $in_code_block; then
                # If we were in a code block, break out of it
                in_code_block=false
                break
            else
                # If we were not in a code block, enter it
                in_code_block=true
                continue
            fi
        fi
        
        # If we are inside a code block, accumulate lines
        if $in_code_block; then
            code_block+="$line"$'\n'
        fi
    done

    # Output the first code block found, removing trailing newlines
    echo -e "$code_block"
else
    # If no code block found, output all the input as is
    echo -e "$input"
fi
