import "./fizzbuzz" as fb;

def test_fizzbuzz_1:
    1 | fb::fizzbuzz;

def test_fizzbuzz_range_1_25:
    range(25) + 1 | fb::fizzbuzz;
