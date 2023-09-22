def fizzbuzz:
    if . == 3 or . == 6 or . == 9 then "Fizz"
    elif . == 5 then "Buzz"
    else .
    end;

def test_up_to: 9;
def test_input: range(test_up_to) + 1;
def printer: [(., " -> ", fizzbuzz) | tostring] | add;

test_input | printer
