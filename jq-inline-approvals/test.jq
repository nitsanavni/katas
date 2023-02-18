def fizzbuzz:
    (if . % 3 == 0 then "Fizz" else "" end +
    if . % 5 == 0 then "Buzz" else "" end) as $s |
    if ($s | length > 0) then $s else . end;

def interpolate:
    map(tostring)|add;

def s: interpolate;

def test_fizzbuzz:
# 10 -> Buzz
# 11 -> 11
# 12 -> Fizz
# 13 -> 13
# 14 -> 14
# 15 -> FizzBuzz
# 16 -> 16
# 17 -> 17
# 18 -> Fizz
# 19 -> 19
    range(10) + 10 | [., " -> ", fizzbuzz] | s;

def one: { w: 1 };
def one_half: { n: 1 , d: 2 };
def one_and_a_half: { w: 1, n: 1 , d: 2 };
def three_halves: { n: 3 , d: 2 };

def format:
    [
        if (.n // 0) == 0 then .w
        elif (.w // 0) == 0 then (.n, "/", .d)
        else (.w, " ", .n, "/", .d)
        end
        | tostring
    ]
    | add;

def reduce_common_factor:
    (.n // 0) as $n |
    reduce (range($n) + 1) as $f ((.gcf = 1); if .d % $f == 0 and .n % $f == 0 then (.gcf = $f) else . end) |
    {
        n: (.n / .gcf | floor),
        d: (.d / .gcf | floor),
        w: .w
    };

def test_reduce_common_factor:
# 1/1
# 1/3
# 3/1
    { n: 2, d: 2 },
    { n: 2, d: 6 },
    { n: 6, d: 2 }
    | reduce_common_factor | format;

def reduce_n_gte_d:
    (.n // 0) as $n |
    (.d // 1) as $d |
    if $d <= $n then
        (.w += ($n / $d | floor)) |
        (.n = $n % $d)
    else
        .
    end;

def test_reduce_n_gte_d:
# 1
# 1/2
# 1 1/2
# 1 1/2
# 3
# 3 1/6
    one,
    one_half,
    one_and_a_half,
    three_halves,
    { n: 18, d: 6 },
    { n: 19, d: 6 }
    | reduce_n_gte_d | format;

def f_add(with):
    .w += (with.w // 0) |
    .n = (.n // 0) * (with.d // 1) + (with.n // 0) * (.d // 1) |
    .d = (.d // 1) * (with.d // 1) |
    reduce_n_gte_d |
    reduce_common_factor;

def test_div:
# 2
    9/ 4 | floor;

def pairs(features):
    features | features as $f | [., $f];

def test_add:
# 1 + 1 = 2
# 1 + 1/2 = 1 1/2
# 1 + 1 1/2 = 2 1/2
# 1 + 1/6 = 1 1/6
# 1 + 2/36 = 1 1/18
# 1/2 + 1 = 1 1/2
# 1/2 + 1/2 = 1
# 1/2 + 1 1/2 = 2
# 1/2 + 1/6 = 2/3
# 1/2 + 2/36 = 5/9
# 1 1/2 + 1 = 2 1/2
# 1 1/2 + 1/2 = 2
# 1 1/2 + 1 1/2 = 3
# 1 1/2 + 1/6 = 1 2/3
# 1 1/2 + 2/36 = 1 5/9
# 1/6 + 1 = 1 1/6
# 1/6 + 1/2 = 2/3
# 1/6 + 1 1/2 = 1 2/3
# 1/6 + 1/6 = 1/3
# 1/6 + 2/36 = 2/9
# 2/36 + 1 = 1 1/18
# 2/36 + 1/2 = 5/9
# 2/36 + 1 1/2 = 1 5/9
# 2/36 + 1/6 = 2/9
# 2/36 + 2/36 = 1/9
    pairs(one, one_half, one_and_a_half, { n: 1, d: 6 }, { n: 2, d: 36 }) |
    (
        [.[], (.[1] as $r | .[0] | f_add($r)) | format] |
        [.[0], " + ", .[1], " = ", .[2]] |
        add
    );

def test_format:
# 1
# 1 1/2
# 1/2
    one,
    one_and_a_half,
    one_half |
    format;

def test_null:
# 2
    { a :1 } | .b // 2;

def one_two: 1, 2;

def test_one_two_one_two:
# [1,1]
# [1,2]
# [2,1]
# [2,2]
    one_two |
    one_two as $b |
    [., $b] | tostring;

def test_pair:
# [[1,1],[1,2],[2,1],[2,2]]
# [[0,0],[0,1],[1,0],[1,1]]
# [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]
    [pairs(1,2)],
    [pairs(0,1)],
    [pairs(0,1,2)] |
    tostring;
