#!/bin/bash

echo "test: adds multiline comment after verify"

tmp=$(mktemp)
echo "echo --- verify result 1 ---" >> $tmp
echo "echo hello world!" >> $tmp

echo "GIVEN this test script (test-script.sh):"
echo '```bash'
cat $tmp
echo '```'

echo "WHEN running ./inline.sh 'bash test-script.sh'"
echo "THEN the inlined output is:"

./inline.sh "bash $tmp"
