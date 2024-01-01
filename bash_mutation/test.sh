#!/bin/bash

mutated_script="$1"
input="Aged Brie|1|1"

echo "$input" | bash "$mutated_script" | diff -u - approved
