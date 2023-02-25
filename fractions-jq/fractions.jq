# fractions

def interpolate: map(tostring) | add;
def s: if isarray then interpolate else tostring end;

def n: (.n // 0) != 0;
def w: (.w // 0) != 0;

def format_whole: .w | s;
def format_part: [.n, "/", .d] | s;

def format:
    [(select(w) | format_whole), (select(n) | format_part)] | join(" ");

def set_defaults:
    .w = .w // 0 |
    .n = .n // 0 |
    .d = .d // 1;

def reduce_d_lte_n:
    set_defaults |
    if n and .d <= .n then
        .w += (.n / .d | floor) |
        .n = .n % .d
    else
        .
    end;

def reduce_common_multiple:
    if n then
        reduce range(.n) + 1 as $m (.; if .n % $m == 0 and .d % $m == 0 then .m = $m else . end) |
        .n = (.n / .m | floor) |
        .d = (.d / .m | floor) |
        del(.m)
    else . end;

def fraction_add:
    map(set_defaults) |
    .[0] as $lhs | .[1] as $rhs |
    {
        w: $lhs.w + $rhs.w,
        n: $lhs.n * $rhs.d + $rhs.n * $lhs.d,
        d: $lhs.d * $rhs.d
    } |
    reduce_d_lte_n |
    reduce_common_multiple;

# fractions tests

def one: {w:1};
def two: {w:2};
def one_and_a_half: {w:1,n:1,d:2};
def three_and_four_fifths: {w:3,n:4,d:5};
def four_fifths: {n:4,d:5};
def four_fourths: {n:4,d:4};
def five_fourths: {n:5,d:4};
def six_fourths: {n:6,d:4};

def examples: one, two, one_and_a_half, three_and_four_fifths, four_fifths, four_fourths, five_fourths, six_fourths;

def pairs(generator):
    generator as $g | $g | generator | [$g, .];

"test reduce common multiple",
(examples | [., reduce_common_multiple | format] | join(" -> ")),
"---",
"test reduce d <= n",
(examples | [., reduce_d_lte_n | format] | join(" -> ")),
"---",
"test format",
(examples | [., "|format -> ", format] | s),
"---",
"test add",
(pairs(examples) | [(map(format) | join(" + ")), " = ", (fraction_add | format)] | s),
"---",
"test pairs",
(["pairs(range(3)) -> ",([pairs(range(3)) | tostring] | join(", "))] | s),
"---"
