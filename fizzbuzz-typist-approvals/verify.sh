#!/bin/bash

# Check if an executable is provided
if [ -z "$1" ]; then
    echo "Usage: ./verify.sh <executable>"
    exit 1
fi

# Create an approved version file
touch "$1.approved"

# Execute the given command and compare its output to the approved version
diff <($1) "$1.approved"
