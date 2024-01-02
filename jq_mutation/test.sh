#!/bin/bash

mutated_script=${1:-gilded_rose}
input=$(jq -rn '[[
    ["Some Item"],
    [0],
    [0]
]|combinations|({name:.[0],sell_in:.[1],quality:.[2]})]')

if [ "$UPDATE" == "1" ]; then
    echo "$input" | jq -rc "include \"$mutated_script\"; update_quality" >approved
else
    echo "$input" | jq -rc "include \"$mutated_script\"; update_quality" | diff - approved
fi
