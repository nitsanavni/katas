def fizz: { d: 3, c: "Fizz" };
def buzz: { d: 5, c: "Buzz" };

def condition(d): . % d == 0;

def fizzbuzz:
  if condition(fizz.d) then fizz.c
  elif . == buzz.d then buzz.c
  else .
  end;

range(6) + 1 | fizzbuzz

