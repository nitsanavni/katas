#!/bin/bash

run_fizzbuzz_program() {
    python3 fizzbuzz.py
}

test() {
    ./verify.sh <(run_fizzbuzz_program) fizzbuzz
}

test
