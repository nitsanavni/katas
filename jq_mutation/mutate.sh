#!/bin/bash

# find specific mutations in the script
mutations=$(python mutations.py)

# split on newlines
IFS=$'\n' read -rd '' -a mutations <<<"$mutations"

for mutation in "${mutations[@]}"; do
    echo "Testing mutation: $mutation"

    # temp file for mutated script
    module=$(basename $(mktemp -t gilded_rose -p .))
    script="$module.jq"

    echo $mutation | grep "inc int" >/dev/null

    if [ $? -eq 0 ]; then
        # most mutations are just sed replacements
        # but this one is handled by a python script
        python inc_int.py gilded_rose.jq $(echo $mutation | grep -oE '\d+') >"$script"
    else
        sed "$mutation" gilded_rose.jq >"$script"
    fi

    rm -f "$module"

    # show what changed (mutated)
    diff gilded_rose.jq "$script"

    echo ""

    # execute the test against the mutated script
    ./test.sh "$module"

    if [ $? -eq 0 ]; then
        # tests passed, mutation survived - a potential gap in our tests
        echo ""
        echo "  Mutation $mutation survived !!"
    else
        # tests failed, mutation killed (caught by tests)
        echo ""
        echo "  Mutation $mutation killed !!"
    fi
    echo ""

    rm "$script"
done
