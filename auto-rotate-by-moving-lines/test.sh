#!/usr/bin/bash

cat_input() {
cat << EOF
$input
EOF
}


echo test: rm typing indication

input="Bob
-- typing -->
Alice"
cat_input
echo -----
cat_input | jaq -sRr 'split("\n")[] | select(test("typing")|not)'
echo ""


echo test: move line down

input="a
b
c"
cat_input
echo -----
cat_input | jaq -sRr 'split("\n") | .[1] as $tmp | .[1] = .[2] | .[2] = $tmp | .[]'
echo ""


echo test: jq filter as bash var

filter="range(5)
| . * .
| . + 1"
jaq -nr "$filter"
echo ""
