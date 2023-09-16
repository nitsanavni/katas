def isMultiple(d): . % d == 0; 

def baseSpecs: [{ d: 3, c: "Fizz" }, { d: 5, c: "Buzz" }, { d: 7, c: "Whizz" }, { d: 11, c: "Bang" }];
def specs: reduce baseSpecs[] as $s ([]; [(map({d:.d*$s.d,c:.c+$s.c}) | .[]) , .[], $s]);



def fizzbuzz:
  . as $n |
  specs |
  map(. as $s | select($n | isMultiple($s.d)) | $s.c) | .[0] //
  $n;

(specs),
(range(106) + 1 | fizzbuzz)

