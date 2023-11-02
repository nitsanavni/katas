#!/usr/bin/env -S jq -nrf

def logic:
    if . % 3 == 0 then "Fizz"
    elif . % 5 == 0 then "Buzz"
    else .
    end;

range(100) + 1 | logic
