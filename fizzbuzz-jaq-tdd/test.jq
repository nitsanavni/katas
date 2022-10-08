
def tests:
    [
        ["fizzbuzz(1) == 1", 1 | fizzbuzz | . == 1]
    ];

tests | map(select(.[1] | not) | .[0])