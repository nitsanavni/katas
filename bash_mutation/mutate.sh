#!/bin/bash -i

mutations=(
    "10s/!=/==/"
    "10s/!=/==/2"
)

for mutation in "${mutations[@]}"; do
    echo "Testing mutation: $mutation"

    mutated_script=$(mktemp)
    sed "$mutation" gilded_rose.sh >"$mutated_script"

    echo "diff -u gilded_rose.sh $mutated_script"
    diff -u gilded_rose.sh "$mutated_script"

    echo ""
    
    ./test.sh "$mutated_script"

    if [ $? -eq 0 ]; then
        echo "  Mutation $mutation survived !!"
    else
        echo "  Mutation $mutation killed !!"
    fi
    echo ""
done
