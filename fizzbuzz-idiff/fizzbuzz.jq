def fizzbuzz:
    if . % 15 == 0 then "FizzBuzz"
    elif . % 3 == 0 then "Fizz"
    elif . % 5 == 0 then "Buzz"
    else .
    end;

# TODO: up to 20
def test_up_to: 19;
def test_input: range(1; test_up_to+1);
def printer: [., " -> ", fizzbuzz | tostring] | add;

test_input | printer
