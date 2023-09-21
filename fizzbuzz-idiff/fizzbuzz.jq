def fizzbuzz: if . == 3 then "Fizz" elif . == 5 then "Buzz" else . end;

def test_up_to: 5;
def test_input: range(test_up_to) + 1;
def test_fizzbuzz:
    test_input |
    [((., " -> ", fizzbuzz) | tostring)] | add;

test_fizzbuzz
