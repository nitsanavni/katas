def part(d; code): if . % d == 0 then code else null end;
def fizz: part(3; "Fizz");
def buzz: part(5; "Buzz");
def whizz: part(7; "Whizz");
def specs: [fizz, buzz];

def fizzbuzz_logic(opts):
    def actual_specs:
        specs +
        if opts.do_whizzbang then [whizz] else [] end;
    (actual_specs | add) // .;

def fizzbuzz(opts):
    range(20) + 1 |
    fizzbuzz_logic(opts);

"test: 1-20",
fizzbuzz({}),
"",
"feature: whizzbang",
"test: 1-20",
fizzbuzz({ do_whizzbang: true })
