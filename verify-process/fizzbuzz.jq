def fizzbuzz:
    if . % 15 == 0 then "FizzBuzz"
    elif . % 5 == 0 then "Buzz"
    elif . % 3 == 0 then "Fizz"
    else . end;

range(100) + 1 | fizzbuzz
