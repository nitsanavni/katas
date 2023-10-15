import pytest
from typing import List

Puzzle = List[List[int]]

ones_puzzle: Puzzle = [[1] * 9 for _ in range(9)]
rows_range_1_through_9 = [[i for i in range(1, 10)] for _ in range(9)]


def validate_rows(puzzle: Puzzle):
    return False


def validate(puzzle):
    return True


def test_validate_rows_ones():
    assert not validate_rows(ones_puzzle)


def test_validate_rows_series():
    assert validate_rows(rows_range_1_through_9)


@pytest.mark.xfail
def test_validate_ones():
    assert not validate(ones_puzzle)
