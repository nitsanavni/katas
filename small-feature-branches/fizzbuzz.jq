#!/usr/bin/env -S jq -nrf

def special_cases: [[15, "FizzBuzz"], [5, "Buzz"], [3, "Fizz"]];
# on main branch, this would be:
# def special_cases: [];

def logic:
    . as $n |
    special_cases |
    map(select($n % .[0] == 0) | .[1]) | .[0] // $n;

range(100) + 1 | logic
