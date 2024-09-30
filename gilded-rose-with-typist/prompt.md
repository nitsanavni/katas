@./mutate_and_test.sh

let's use this for parsing fields of mutations:

echo '35|||item.quality < 50|||not (item.quality < 50)' | jq -Rr 'split("|||")[0]'
