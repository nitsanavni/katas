#!/usr/bin/env zx

await $`jaq -n "range(10)|.+1" | jaq -rf fizzbuzz.jq | python -m approvaltests -t fizzbuzz`;
