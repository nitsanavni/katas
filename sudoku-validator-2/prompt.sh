#!/bin/bash


echo "what's the smallest next step?"

think=$(chat "
background: we're working on this kata:

$(bat sudoku-validator-description.md)

$(cat tdd.md)

task:
what's the smallest next step? (stop! even smaller than that!)

format:
TDD: where are we in the TDD workflow exactly?
thinking: write your thinking
answer: your answer
c/7: confidence level on a scale of 1-7, just the number, no extra words

here's the status of the code:
$(for file in *.py; do echo "$file"; echo "---"; cat "$file"; echo "---"; done)

here's the output of running `pytest`:
$(pytest)
")

echo "$think"
echo

echo "propose a change to the code"

change=$(chat "
we're working on this kata:

$(bat sudoku-validator-description.md)

task: propose the next very small change to make to the code in order to progress towards this next step:
---
$think
---

format:
thinking: write your thinking
change: the proposed change in plain English, no code, yes filename, function names, line numbers if relevant

here's the code:
$(cat *.py)

pytest output:
$(pytest)
")

echo
echo "$change"

