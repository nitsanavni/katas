#!/bin/bash

tmp=mktemp
./inline.py test.jq > $tmp
cp $tmp test.jq
rm $tmp
