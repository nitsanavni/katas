def fizzbuzz(do_fizzbuzz):
    range(20) + 1 |
    if do_fizzbuzz then
        if . == 3 then "Fizz" else . end
    else
        .
    end;

"test: 1-20",
fizzbuzz(false),
"",
"feature: fizz, buzz, fizzbuzz",
"test: 1-20, fizz, buzz, fizzbuzz",
fizzbuzz(true)