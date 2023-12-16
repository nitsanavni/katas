#!/bin/bash

function find_tests() {
    find . -name 'test_*.jq' | sort
}

function test_methods_in_file() {
    local file=$1
    grep -o 'def test_[^\:]*' $file | sed 's/def //' | sort
}

function run_test_method() {
    local module=$1
    local test_method=$2
    jq -L . -nr "import \"$module\" as t; t::$test_method"
}

function verify_test_method() {
    local file=$1
    local module=$(echo $file | sed 's/\.jq//')
    local test_method=$2
    echo "  $test_method" >&2
    local received=$(run_test_method $module $test_method)
    local base="$module.$test_method"
    local approved_file="$base.approved"
    local received_file="$base.received"
    echo "$received" >$received_file
    if [ ! -f $approved_file ]; then
        echo "  Approved file not found. Creating $approved_file" >&2
        mv $received_file $approved_file
    else
        if ! diff -u $approved_file $received_file; then
            echo "  Received output differs from approved output." >&2
            echo "  To approve the new output, run:" >&2
            echo "    mv $received_file $approved_file" >&2
            exit 1
        fi
        rm $received_file
    fi
}

function run_tests_in_file() {
    echo "$1" >&2
    local file=$1
    local test_methods=$(test_methods_in_file $file)
    for test_method in $test_methods; do
        verify_test_method $file $test_method
    done
}

function run_tests() {
    local files=$(find_tests)
    for file in $files; do
        run_tests_in_file $file
    done
}

run_tests
