#!/bin/bash

function find_test_files() {
    find . -name 'test_*.jq' | sort
}

function test_methods_in_file() {
    local file=$1
    grep -o 'def test_[^:^\(]*' $file | sed 's/def //' | sort
}

function run_test_method() {
    local module=$1
    local test_method=$2
    jq -nr "include \"$module\"; $test_method"
}

function verify_test_method() {
    local module=$1
    local test_method=$2
    local base="$module.$test_method"
    echo "  $test_method" >&2
    local received=$(run_test_method $module $test_method)
    local approved_file="$base.approved"
    local received_file="$base.received"
    echo "$received" >$received_file
    if [ ! -f $approved_file ]; then
        echo "  🚫 failed" >&2
        echo "  $approved_file not found" >&2
        echo "  received output is:" >&2
        cat $received_file >&2
        exit 1
    else
        if ! diff -u $approved_file $received_file; then
            echo "  🚫 failed" >&2
            exit 1
        else
            echo "  ✅ passed" >&2
            rm $received_file
        fi
    fi
}

function run_tests_in_file() {
    local file=$1
    local module=$(echo $file | sed 's/\.jq//' | sed 's/^\.\///')
    echo "" >&2
    echo $module >&2
    echo "" >&2
    local test_methods=$(test_methods_in_file $file)
    for test_method in $test_methods; do
        verify_test_method $module $test_method
        echo "" >&2
    done
    echo "" >&2
}

function run_tests() {
    local files=$(find_test_files)
    for file in $files; do
        run_tests_in_file $file
    done
}

run_tests
