def fizzbuzz:
    .;

def tests:
    [
        ["fizzbuzz(1) == 1", (1 | fizzbuzz | . == 1)],
        ["fizzbuzz(2) == 2", (2 | fizzbuzz | . == 2)]
    ];

tests | map(select(.[1] | not) | .[0]) | if length == 0 then "green" else . end