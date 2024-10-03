#!/usr/bin/env python3
import pytest
from fizzbuzz import fizzbuzz


def test_fizzbuzz():
    # Test individual numbers and range with updated conditions
    cases = [
        (1, "1"),
        (2, "2"),
        (3, "Fizz"),
        (4, "4"),
        (5, "Buzz"),
        (6, "Fizz"),
        (7, "Whizz"),
        (8, "8"),
        (9, "Fizz"),
        (10, "Buzz"),
        (11, "Bang"),
        (12, "Fizz"),
        (13, "Bong"),
        (14, "Whizz"),      # 14 = 7 * 2, so should be Whizz
        (15, "FizzBuzz"),   # 3 and 5
        (21, "FizzWhizz"),  # 3 and 7
        (22, "Bang"),       # 11
        (26, "Bong"),       # 13
        (30, "FizzBuzz"),   # 3 and 5
        (35, "BuzzWhizz"),  # 5 and 7
        (39, "FizzBong"),   # 3 and 13, changed from FizzBang to FizzBong
        (65, "BuzzBong"),   # 5 and 13
        (105, "FizzBuzzWhizz"),  # 3, 5 and 7
        (0, "FizzBuzzWhizzBangBong"),  # 3, 5, 7, 11, and 13
        (-3, "Fizz"),
        (-5, "Buzz"),
        (-7, "Whizz"),
        (-11, "Bang"),
        (-13, "Bong"),
        (-15, "FizzBuzz"),
        (-21, "FizzWhizz"),
    ]

    for number, expected in cases:
        assert fizzbuzz(number) == expected


if __name__ == "__main__":
    pytest.main(["-q", __file__])
