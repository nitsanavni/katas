def fizzbuzz_logic:
    if . % 15 == 0 then "FizzBuzz"
    elif . % 3 == 0 then "Fizz"
    elif . % 5 == 0 then "Buzz"
    else . end;

def fizzbuzz:
    range(20) + 1 |
    fizzbuzz_logic;

"test: 1-20",
fizzbuzz,
"",
"feature: whizzbang",
"test: 1-20",
fizzbuzz
