#!/bin/bash

lib='
def validate_row: sort == [range(9)+1];
def get_rows:
  split("\n") |
  map(select(length>0) | split(" ") | map(tonumber));
    def get_columns: get_rows|transpose;
'

echo test: check a row
echo ""
echo valid row
valid_row=$(jq -cn '[range(9)+1]')
result=$(echo $valid_row | jq -c "$lib"'validate_row')
echo "$valid_row | validate_row -> $result"

echo ""
echo ""
echo test: get rows
echo ""
input="1 2 3\n4 5 6\n7 8 9"
result=$(echo -e $input | jq -csR "$lib"'get_rows')
echo -e "$input | get_rows -> $result"

echo ""
echo ""
echo test: get columns
echo ""
result=$(echo -e $input | jq -csR "$lib"'get_columns')
echo -e "$input | get_columns -> $result"



