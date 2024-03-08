#!/bin/bash

# usage: verify <received-file-descriptor> <test-name>

verify() {
    cp $1 $2.received
    touch $2.approved
    diff -q $2.received $2.approved
    if [ $? -eq 0 ]; then
        rm $2.received
        echo "Test passed"
    else
        echo "Test failed"
        code --diff $2.received $2.approved
        exit 1
    fi
}

print_usage() {
    echo "Usage: verify <received-file-descriptor> <test-name>"
}

if [ $# -ne 2 ]; then
    print_usage
    exit 1
fi

verify $1 $2
