#!/bin/bash
if [ -z "$1" ]; then
    set -- "example.py"
fi

diff -w "$1" <(python replace.py "$1")
