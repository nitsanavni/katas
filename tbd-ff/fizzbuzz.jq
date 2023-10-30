def part(d; code): if . % d == 0 then code else null end;

def fizz: part(3; "Fizz");
def buzz: part(5; "Buzz");
def whizz: part(7; "Whizz");
def bang: part(11; "Bang");

def specs: [fizz, buzz];
def whizzbang_specs: [whizz, bang];


def fizzbuzz_logic(opts):
    def actual_specs:
        specs + whizzbang_specs;
    (actual_specs | add) // .;

def fizzbuzz(opts):
    range(40) + 1 |
    fizzbuzz_logic(opts);

"test: 1-40",
fizzbuzz({ do_whizzbang: true })
