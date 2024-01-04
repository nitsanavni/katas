#!/bin/bash

mutated_script=${1:-gilded_rose}

exit_code=0

if [ "$SKIP_APPROVALTESTS" != "1" ]; then
    input=$(jq -rn '[[
    ["Some Item", "Aged Brie", "Backstage passes to a TAFKAL80ETC concert", "Sulfuras, Hand of Ragnaros"],
    [0,1,11,6,-1],
    [0,1,-1,50,49,2]
]|combinations|({name:.[0],sell_in:.[1],quality:.[2]})]')

    received=$(echo "$input" | jq -r "include \"$mutated_script\"; update_quality | .[] | ([.name,.sell_in,.quality|tostring])|join(\",\")")

    if [ "$UPDATE" == "1" ]; then
        echo "$received" >approved
    else
        echo "$received" | diff - approved
        exit_code=$?
    fi
fi

unit_test() {
    description="$1"
    input="$2"
    expected="$3"
    received=$(echo "$input" | jq -cr "include \"$mutated_script\"; update_quality")
    diff <(echo "$expected") <(echo "$received")
    if [ $? -ne 0 ]; then
        echo "  $description failed"
        exit_code=1
    fi
}

unit_test "test: at the end of each day our system lowers both values for every item" \
    '[{"name":"An Item","sell_in":10,"quality":10}]' \
    '[{"name":"An Item","sell_in":9,"quality":9}]'

unit_test "test: Once the sell by date has passed, Quality degrades twice as fast" \
    '[{"name":"An Item","sell_in":0,"quality":10}]' \
    '[{"name":"An Item","sell_in":-1,"quality":8}]'

unit_test "test: The Quality of an item is never negative" \
    '[{"name":"An Item","sell_in":10,"quality":0}]' \
    '[{"name":"An Item","sell_in":9,"quality":0}]'

unit_test "test: Aged Brie actually increases in Quality the older it gets" \
    '[{"name":"Aged Brie","sell_in":10,"quality":10}]' \
    '[{"name":"Aged Brie","sell_in":9,"quality":11}]'

unit_test "test: The Quality of an item is never more than 50" \
    '[{"name":"Aged Brie","sell_in":10,"quality":50}]' \
    '[{"name":"Aged Brie","sell_in":9,"quality":50}]'

unit_test "test: Sulfuras, being a legendary item, never has to be sold or decreases in Quality" \
    '[{"name":"Sulfuras, Hand of Ragnaros","sell_in":10,"quality":80}]' \
    '[{"name":"Sulfuras, Hand of Ragnaros","sell_in":10,"quality":80}]'

unit_test "test: Backstage passes, like aged brie, increases in Quality as its SellIn value approaches" \
    '[{"name":"Backstage passes to a TAFKAL80ETC concert","sell_in":20,"quality":10}]' \
    '[{"name":"Backstage passes to a TAFKAL80ETC concert","sell_in":19,"quality":11}]'

unit_test "test: Backstage passes Quality increases by 2 when there are 10 days or less" \
    '[{"name":"Backstage passes to a TAFKAL80ETC concert","sell_in":10,"quality":10}]' \
    '[{"name":"Backstage passes to a TAFKAL80ETC concert","sell_in":9,"quality":12}]'

unit_test "test: Backstage passes Quality increases by 3 when there are 5 days or less" \
    '[{"name":"Backstage passes to a TAFKAL80ETC concert","sell_in":5,"quality":10}]' \
    '[{"name":"Backstage passes to a TAFKAL80ETC concert","sell_in":4,"quality":13}]'

unit_test "test: Backstage passes Quality drops to 0 after the concert" \
    '[{"name":"Backstage passes to a TAFKAL80ETC concert","sell_in":0,"quality":10}]' \
    '[{"name":"Backstage passes to a TAFKAL80ETC concert","sell_in":-1,"quality":0}]'

exit $exit_code
