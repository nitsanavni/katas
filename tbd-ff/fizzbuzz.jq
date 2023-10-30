def fizzbuzz_logic:
    def fizz:
        def d: 3;
        def code: "Fizz";
        if . % d == 0 then code else null end;
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
