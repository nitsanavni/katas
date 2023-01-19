#!/bin/bash

echo "test: adds multiline comment after verify"

tmp=$(mktemp)
echo "echo --- verify result ---" >> $tmp
echo "echo hello world!" >> $tmp
echo ": 'verify result" >> $tmp
echo "'" >> $tmp

echo "GIVEN this test script (test-script.sh):"
echo '```bash'
cat $tmp
echo '```'

echo "WHEN running ./inline.sh 'bash test-script.sh' test-script.sh"
echo "THEN the inlined output is:"

./inline.sh $tmp
