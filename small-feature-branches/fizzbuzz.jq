#!/usr/bin/env -S jq -nrf

def logic: .;

range(100) + 1 | logic
