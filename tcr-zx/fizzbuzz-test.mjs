#!/usr/bin/env zx

await $`jaq -n "range(10)" | jaq -f fizzbuzz.jq | python -m approvaltests -t fizzbuzz`;
