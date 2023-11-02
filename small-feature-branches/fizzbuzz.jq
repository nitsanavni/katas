#!/usr/bin/env -S jq -nrf

def logic: if . == 3 then "Fizz" elif . == 5 then "Buzz" else . end;

range(100) + 1 | logic
