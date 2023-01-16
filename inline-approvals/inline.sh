#!/bin/bash

result=$(mktemp)

eval "$1" > result

echo 'cat $2'
cat "$2"

echo 'eval $1'
cat result
