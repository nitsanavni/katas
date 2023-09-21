def part(d; name): if . % d == 0 then name else null end;

def fizz: part(3; "Fizz");
def buzz: if . % 5 == 0 then "Buzz" else null end;

def fizzbuzz: fizz + buzz // .;

def test_up_to: 15;
def test_input: range(test_up_to) + 1;
def test_fizzbuzz:
    test_input |
    [((., " -> ", fizzbuzz) | tostring)] | add;

test_fizzbuzz
