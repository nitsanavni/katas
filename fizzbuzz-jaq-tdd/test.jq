def spec:
    [3, "fizz"],
    [5, "buzz"],
    [7, "whizz"],
    [11, "bang"] |
    {
        divisor: .[0],
        code: .[1]
    };

def is_multiple(n; of):
    n % of == 0;

def codes:
    . as $n |
    [
        spec |
        select(is_multiple($n; .divisor)) |
        .code
    ] |
    add;

def fizzbuzz:
    codes // .;

def mul:
    reduce .[] as $d (1; . * $d);

def least_common_multiple:
    [spec | .divisor] | mul;

def tests:
    ["1 is 1", 1, 1],
    ["2 is 2", 2, 2],
    ["3 is fizz", 3, "fizz"],
    ["7 is whizz", 7, "whizz"],
    ["15 is fizzbuzz", 15, "fizzbuzz"],
    ["least common multiple -> fizzbuzzwhizzbang", least_common_multiple, "fizzbuzzwhizzbang"] |
    {
        name: .[0],
        input: .[1],
        expected: .[2],
    };

tests |
. as $t |

# Act
$t.input | fizzbuzz | . as $result |

# Assert
$result == $t.expected |

# Report - only failing tests
select(not) | $t + { actual: $result }
