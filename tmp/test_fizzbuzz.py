from fizzbuzz import fizzbuzz
import pytest

def test_fizzbuzz_1():
    assert fizzbuzz(1) == "1"

def test_fizzbuzz_3():
    assert fizzbuzz(3) == "Fizz"
