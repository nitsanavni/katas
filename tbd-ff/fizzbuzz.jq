def fizzbuzz_logic:
    def fizz: if . % 3 == 0 then "Fizz" else null end;
    def buzz: if . % 5 == 0 then "Buzz" else null end;
    def foo: fizz + buzz // .;
    foo;

def fizzbuzz(opts):
    range(20) + 1 |
    fizzbuzz_logic;

"test: 1-20",
fizzbuzz({}),
"",
"feature: whizzbang",
"test: 1-20",
fizzbuzz({ do_whizzbang: true })
