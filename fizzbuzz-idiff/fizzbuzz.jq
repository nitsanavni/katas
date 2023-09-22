def fizzbuzz:
    if . == 3 or . == 6 then "Fizz"
    elif . == 5 then "Buzz"
    else .
    end;

def test_up_to: 6;
def test_input: range(test_up_to) + 1;
def printer: [(., " -> ", fizzbuzz) | tostring] | add;

test_input | printer
