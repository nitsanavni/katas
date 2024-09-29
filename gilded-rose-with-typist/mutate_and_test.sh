#!/bin/bash

# Parse arguments
MUTATE_FILE=""
TEST_CMD=""
REPORT_FILE="mutation_report.txt"

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --mutate_file) MUTATE_FILE="$2"; shift ;;
        --test_cmd) TEST_CMD="$2"; shift ;;
        --report) REPORT_FILE="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

if [[ -z "$MUTATE_FILE" || -z "$TEST_CMD" ]]; then
    echo "Usage: $0 --mutate_file <file> --test_cmd \"<command>\" [--report <report_file>]"
    exit 1
fi

# Run the test command before mutations
if ! eval "$TEST_CMD"; then
    echo "Test command failed before mutations. Exiting."
    exit 1
fi

# Generate mutations and read into an array
MUTATIONS=()
while IFS= read -r line; do
    MUTATIONS+=("$line")
done < <(python3 generate_mutations.py "$MUTATE_FILE")

# Backup the original file
cp "$MUTATE_FILE" "$MUTATE_FILE.bak"

TOTAL_MUTATIONS=${#MUTATIONS[@]}
SURVIVING_MUTATIONS=()

for MUTATION in "${MUTATIONS[@]}"; do
    # Each MUTATION is of the form: line_number|||pattern|||replacement
    LINE_NUMBER=$(echo "$MUTATION" | cut -d '|' -f 1)
    PATTERN=$(echo "$MUTATION" | cut -d '|' -f 4)
    REPLACEMENT=$(echo "$MUTATION" | cut -d '|' -f 7)
    
    echo "Applying mutation at line $LINE_NUMBER: replace '$PATTERN' with '$REPLACEMENT'"

    # Escape special characters in pattern and replacement for sed
    ESCAPED_PATTERN=$(printf '%s\n' "$PATTERN" | sed -e 's/[\/&]/\\&/g')
    ESCAPED_REPLACEMENT=$(printf '%s\n' "$REPLACEMENT" | sed -e 's/[\/&]/\\&/g')

    # Apply the mutation using sed
    sed -i '' "${LINE_NUMBER}s/${ESCAPED_PATTERN}/${ESCAPED_REPLACEMENT}/" "$MUTATE_FILE"

    # Run the test command
    if eval "$TEST_CMD"; then
        # Test passed; mutation survived
        SURVIVING_MUTATIONS+=("$MUTATION")
    fi

    # Restore the original file for the next mutation
    cp "$MUTATE_FILE.bak" "$MUTATE_FILE"
done

# Report surviving mutations
if [[ ${#SURVIVING_MUTATIONS[@]} -gt 0 ]]; then
    echo "Total surviving mutations: ${#SURVIVING_MUTATIONS[@]}/$TOTAL_MUTATIONS" | tee "$REPORT_FILE"
    for MUTATION in "${SURVIVING_MUTATIONS[@]}"; do
        IFS='|||' read -r LINE_NUMBER PATTERN REPLACEMENT <<< "$MUTATION"
        echo "Line $LINE_NUMBER, Pattern '$PATTERN', Replacement '$REPLACEMENT'" | tee -a "$REPORT_FILE"
    done
else
    echo "All mutations were killed." | tee "$REPORT_FILE"
fi

# Restore the original file
mv "$MUTATE_FILE.bak" "$MUTATE_FILE"
