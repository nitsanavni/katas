def fizzbuzz:
    if . % 3 == 0 and . % 5 == 0 then "FizzBuzz"
    elif . % 3 == 0 then "Fizz"
    elif . % 5 == 0 then "Buzz"
    else .
    end;

def test_up_to: 15;
def test_input: range(test_up_to) + 1;
def printer: [(., " -> ", fizzbuzz) | tostring] | add;

test_input | printer
