#!/bin/bash

mutations=(
    "10s/!=/==/"
    "10s/!=/==/2"
    "10s/\[\[.*\]\]/true/"
    "10s/\[\[.*\]\]/false/"
    "11s/> 0/>= 0/"
    "11s/((quality > 0))/true/"
    "11s/((quality > 0))/false/"
    "12s/!=/==/"
    "12s/\[\[.*\]\]/true/"
    "12s/\[\[.*\]\]/false/"
)

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
