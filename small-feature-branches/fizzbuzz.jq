#!/usr/bin/env -S jq -nrf

def logic:
    . as $n |
    [[15, "FizzBuzz"], [5, "Buzz"], [3, "Fizz"]] |
    map(select($n % .[0] == 0) | .[1]) | .[0] // $n;

range(100) + 1 | logic
