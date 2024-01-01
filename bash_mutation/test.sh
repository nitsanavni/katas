#!/bin/bash

mutated_script="$1"
input=$(jq -rn '[["Some Item"],[0,1],[0]]|combinations|join("|")')

if [ "$UPDATE" == "1" ]; then
    echo "$input" | bash "$mutated_script" >approved
else
    echo "$input" | bash "$mutated_script" | diff -u - approved
fi
