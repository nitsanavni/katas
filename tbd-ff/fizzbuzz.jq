def part(d; code): if . % d == 0 then code else null end;
def fizz: part(3; "Fizz");
def buzz: part(5; "Buzz");
def specs: [fizz, buzz];

def fizzbuzz_logic:
    (specs | add) // .;

def fizzbuzz(opts):
    range(20) + 1 |
    fizzbuzz_logic;

"test: 1-20",
fizzbuzz({}),
"",
"feature: whizzbang",
"test: 1-20",
fizzbuzz({ do_whizzbang: true })
