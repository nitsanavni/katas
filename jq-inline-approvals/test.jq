def fizz: "Fizz";

def fizzbuzz:
    if . % 15 == 0 then "FizzBuzz"
    elif . % 3 == 0 then fizz
    elif . % 5 == 0 then "Buzz"
    else .
    end;

def test_fizz:
# Fizz
    fizz;

def test_fizzbuzz:
# 10 -> Buzz
# 11 -> 11
# 12 -> Fizz
# 13 -> 13
# 14 -> 14
# 15 -> FizzBuzz
# 16 -> 16
    range(7) | . + 10 | [., " -> ", fizzbuzz | tostring] | add;

def test_multiple:
# true true false false
    [6 % 3 == 0,
    3 % 3 == 0,
    2 % 3 == 0,
    1 % 3 == 0 | tostring] | join(" ");

def test_how_to_use_map_select:
# 0
# 1
    range(3) | select(. < 2);

def test_nested_defs:
# null
    .;
