def fizzbuzz:
    if .==3 then "fizz" else . end;

def tests:
    [
        ["fizzbuzz(1) == 1", (1 | fizzbuzz | . == 1)],
        ["fizzbuzz(2) == 2", (2 | fizzbuzz | . == 2)],
        ["fizzbuzz(3) == fizz", (3 | fizzbuzz | . == "fizz")],
        ["fizzbuzz(4) == 4", (4 | fizzbuzz | . == 4)],
        ["fizzbuzz(5) == buzz", (5 | fizzbuzz | . == "buzz")]
    ];

tests | map(select(.[1] | not) | .[0]) | if length == 0 then "green" else {red:.} end