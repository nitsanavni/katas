jq -nr 'def fizzbuzz: if . % 3 == 0 then "Fizz" elif . == 5 or . == 10 then "Buzz" else . end; range(10) + 1 | fizzbuzz'
