def spec:
    [
        { d: 3, code: "Fizz" },
        { d: 5, code: "Buzz" },
        { d: 7, code: "Whizz" },
        { d: 11, code: "Bang" }
    ];

def default_to(n):
    if length == 0 then n else . end;

def gather_all_relevant_codes_for(n):
    spec | map(select(n % .d == 0) | .code) | join("");

def fizzbuzz:
    . as $n |
    gather_all_relevant_codes_for($n) |
    default_to($n);

def least_common_multiple:
    spec | map(.d) | reduce .[] as $d (1; . * $d);

range(least_common_multiple) | . + 1 | fizzbuzz
