def fizzbuzz: if . == 3 then "Fizz" else . end;

def test_up_to: 3;
def test_input: range(test_up_to) + 1;

test_input | [((.," -> ",fizzbuzz) | tostring)] | add
