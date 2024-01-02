#!/bin/bash

mutated_script=${1:-gilded_rose}
input=$(jq -rn '[[
    ["Some Item", "Aged Brie", "Backstage passes to a TAFKAL80ETC concert", "Sulfuras, Hand of Ragnaros"],
    [0,1,11,6,-1],
    [0,1,-1,50,49]
]|combinations|({name:.[0],sell_in:.[1],quality:.[2]})]')

if [ "$UPDATE" == "1" ]; then
    echo "$input" | jq -r "include \"$mutated_script\"; update_quality" >approved
else
    echo "$input" | jq -r "include \"$mutated_script\"; update_quality" | diff - approved
fi
