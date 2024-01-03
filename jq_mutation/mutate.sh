#!/bin/bash

mutations=$(python mutations.py)

# split on newlines
IFS=$'\n' read -rd '' -a mutations <<<"$mutations"

for mutation in "${mutations[@]}"; do
    echo "Testing mutation: $mutation"

    module=$(basename $(mktemp -t gilded_rose -p .))
    script="$module.jq"

    sed "$mutation" gilded_rose.jq >"$script"

    rm -f "$module"

    diff gilded_rose.jq "$script"

    echo ""

    ./test.sh "$module"

    if [ $? -eq 0 ]; then
        echo ""
        echo "  Mutation $mutation survived !!"
    else
        echo ""
        echo "  Mutation $mutation killed !!"
    fi
    echo ""

    rm "$script"
done