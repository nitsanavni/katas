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
echo ------------------------
cat_input | jaq -sRr 'split("\n")[] | select(test("typing")|not)'
echo ""


echo test: swap lines
echo ------------------------
echo 'swap(1;2)'
jaq -sRr "$lib"'split("\n") | swap(1;2) | .[]' abc
echo 'swap(0;2)'
jaq -sRr "$lib"'split("\n") | swap(0;2) | .[]' abc
echo ""


echo test: jq filter as bash var

filter="range(5)
| . * .
| . + 1"
jaq -nr "$filter"
echo ""

echo test: line index by regex
echo ------------------------
jaq -sRr "$lib"'split("\n") | index_of("b")' abc
echo ""

echo test: move regexed line one line down
echo ------------------------
jaq -nr '"a","b","c"' | jaq -sRr "$lib"'split("\n")[0:-1] | move_line_down("b") | .[]' 
echo ""

echo test: find our block
echo ------------------------
jaq -nr '(range(3)|"before"),"","a","b","c","",range(3)' |\
jaq -sRr "$lib"'split("\n")[0:-1] | block("\\bb\\b")'
echo ""
