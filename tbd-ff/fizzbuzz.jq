def fizzbuzz_logic:
    def fizz: if . % 3 == 0 then "Fizz" else null end;
    def buzz: if . % 5 == 0 then "Buzz" else null end;
    if . % 15 == 0 then
        fizz + buzz
    elif . % 3 == 0 then fizz
    elif . % 5 == 0 then "Buzz"
    else . end;

def fizzbuzz(opts):
    range(20) + 1 |
    fizzbuzz_logic;

"test: 1-20",
fizzbuzz({}),
"",
"feature: whizzbang",
"test: 1-20",
fizzbuzz({ do_whizzbang: true })
