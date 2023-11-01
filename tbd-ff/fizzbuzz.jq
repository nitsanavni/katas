def part(d; code): if . % d == 0 then code else null end;

def fizz: part(3; "Fizz");
def buzz: part(5; "Buzz");
def whizz: part(7; "Whizz");
def bang: part(11; "Bang");

def fizzbuzz_only: fizz + buzz;
def whizzbang(opts):
    if opts.revert_whizzbang then
        null
    else
        (whizz + bang)
    end;

def fizzbuzz_logic(opts):
    fizzbuzz_only + whizzbang(opts) // .;

def fizzbuzz(opts):
    range(40) + 1 |
    fizzbuzz_logic(opts);

"test: 1-40",
fizzbuzz({}),
"",
"feature: revert whizz and bang",
fizzbuzz({ revert_whizzbang: true })