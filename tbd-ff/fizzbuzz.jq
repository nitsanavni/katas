def fizzbuzz_logic:
    def part(d; code): if . % d == 0 then code else null end;
    def fizz: part(3; "Fizz");
    def buzz:
        if . % 5 == 0 then "Buzz" else null end;
    fizz + buzz // .;

def fizzbuzz(opts):
    range(20) + 1 |
    fizzbuzz_logic;

"test: 1-20",
fizzbuzz({}),
"",
"feature: whizzbang",
"test: 1-20",
fizzbuzz({ do_whizzbang: true })
