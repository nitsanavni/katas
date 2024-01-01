#!/bin/bash

mutations=$(python mutations.py)

# split on newlines
IFS=$'\n' read -rd '' -a mutations <<<"$mutations"

for mutation in "${mutations[@]}"; do
    echo "Testing mutation: $mutation"

    mutated_script=$(mktemp)
    sed "$mutation" gilded_rose.sh >"$mutated_script"

    diff gilded_rose.sh "$mutated_script"

    echo ""

    ./test.sh "$mutated_script"

    if [ $? -eq 0 ]; then
        echo ""
        echo "  Mutation $mutation survived !!"
    else
        echo ""
        echo "  Mutation $mutation killed !!"
    fi
    echo ""
done
