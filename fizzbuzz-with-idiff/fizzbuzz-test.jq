def fizz: {d:3,c:"Fizz"};
def buzz: {d:5,c:"Buzz"};
def combine: .[0] as $spec1 | .[1] as $spec2 | { d: $spec1.d * $spec2.d, c: $spec1.c + $spec2.c };
def specs: [fizz, buzz] | [combine, .[]];

def isMultiple(d): . % d == 0; 

def condition(d): isMultiple(d);

def fizzbuzz:
  . as $n |
  (reduce specs[] as $spec (null; . // if ($n | condition($spec.d)) then $spec.c else null end)) // $n;

def s: map(tostring) | add;

"test: fizzbuzz",
(range(15) + 1 | [.," -> ", fizzbuzz] | s)

