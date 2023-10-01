from fizzbuzz import fizzbuzz
def test_fizzbuzz_of_one():
    assert fizzbuzz(1) == 1
def test_fizzbuzz_of_two():
    assert fizzbuzz(2) == 2
def test_fizzbuzz_of_three():
    assert fizzbuzz(3) == "Fizz"
def test_fizzbuzz_of_four():
    assert fizzbuzz(4) == 4
def test_fizzbuzz_of_five():
    assert fizzbuzz(5) == "Buzz"
