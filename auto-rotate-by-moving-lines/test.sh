#!/usr/bin/bash

cat_input() {
(cat << EOF
$input
EOF
)
}
echo test 1
input="Bob
-- typing -->
Alice"
cat_input
cat_input | jaq -sR '.'
echo ""
