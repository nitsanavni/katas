def new_fizzbuzz:
    if . == 3 then "Fizz" else . end;

def fizzbuzz(do_new_fizzbuzz):
    range(20) + 1 |
    if do_new_fizzbuzz then
        new_fizzbuzz
    else
        .
    end;

"test: 1-20",
fizzbuzz(false),
"",
"feature: fizz, buzz, fizzbuzz - aka 'new fizzbuzz'",
"test: 1-20, fizz, buzz, fizzbuzz",
fizzbuzz(true)