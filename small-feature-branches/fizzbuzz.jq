#!/usr/bin/env -S jq -nrf

def logic: if . == 3 then "Fizz" else if . == 5 then "Buzz" else . end end;

range(100) + 1 | logic
