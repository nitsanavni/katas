#!/bin/bash

mutated_script="$1"
input=$(jq -rn '[
    ["Some Item", "Aged Brie", "Sulfuras, Hand of Ragnaros", "Backstage passes to a TAFKAL80ETC concert"],
    [0,1,11,6,-1],
    [0,1,50,49]
]|combinations|join("|")')

if [ "$UPDATE" == "1" ]; then
    echo "$input" | bash "$mutated_script" >approved
else
    echo "$input" | bash "$mutated_script" | diff - approved
fi
