def part(d; code): if . % d == 0 then code else null end;

def fizz: part(3; "Fizz");
def buzz: part(5; "Buzz");
def whizz: part(7; "Whizz");
def bang: part(11; "Bang");

def fizzbuzz_logic:
    ([fizz, buzz, whizz, bang] | add) // .;

def fizzbuzz:
    range(40) + 1 |
    fizzbuzz_logic;

"test: 1-40",
fizzbuzz
