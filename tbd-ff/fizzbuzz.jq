def new_fizzbuzz_logic:
    if . % 15 == 0 then "FizzBuzz"
    elif . % 3 == 0 then "Fizz"
    elif . % 5 == 0 then "Buzz"
    else . end;

def fizzbuzz(do_new_fizzbuzz):
    range(20) + 1 |
    if do_new_fizzbuzz then
        new_fizzbuzz_logic
    else
        .
    end;

"test: 1-20",
fizzbuzz(false),
"",
"feature: fizz, buzz, fizzbuzz - aka 'new fizzbuzz'",
"test: 1-20, fizz, buzz, fizzbuzz",
fizzbuzz(true)