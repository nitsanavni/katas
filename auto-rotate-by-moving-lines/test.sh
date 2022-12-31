#!/usr/bin/bash

lib=$(cat lib.jq)

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


echo test: swap lines

input="a
b
c"
cat_input
echo -----
echo 'swap(1;2)'
cat_input | jaq -sRr "$lib"'split("\n") | swap(1;2) | .[]'
echo 'swap(0;2)'
cat_input | jaq -sRr "$lib"'split("\n") | swap(0;2) | .[]'
echo ""


echo test: jq filter as bash var

filter="range(5)
| . * .
| . + 1"
jaq -nr "$filter"
echo ""
