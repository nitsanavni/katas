def d(n): . % n == 0;

def special_case(n; word):
    if d(n) then word else null end;

def fizz: special_case(3; "Fizz");
def buzz: special_case(5; "Buzz");

def special_cases: [fizz, buzz];

def fb:
    (special_cases | add) // .;

range(15) + 1 | fb