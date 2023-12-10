#!/usr/bin/env python -m pytest -q

from approvaltests import verify, Options
from approvaltests.reporters import ReporterThatAutomaticallyApproves
from functools import partial
from itertools import zip_longest


def verify_inline(*args, **kwargs):
    return verify(
        *args,
        **kwargs,
        options=Options().with_reporter(ReporterThatAutomaticallyApproves()).inline()
    )


def chunk(l: list, n: int) -> list[list]:
    return [l[i : i + n] for i in range(0, len(l), n)]


def test_chunk_9_3():
    """
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    """
    verify_inline(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3))


def test_chunk_9_4():
    """
    [[1, 2, 3, 4], [5, 6, 7, 8], [9]]
    """
    verify_inline(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 4))


def table(rows: list[list[str]]) -> str:
    _widths = widths(rows)
    rows = [
        [
            (row[i] if i < len(row) else "").ljust(_widths[i])
            for i, w in enumerate(_widths)
        ]
        for row in rows
    ]
    rows = ["| " + " | ".join(row) + " |" for row in rows]
    return "\n".join(rows)


def widths(rows: list[list[str]]) -> list[int]:
    return [max(len(cell or "") for cell in col) for col in zip_longest(*rows)]


def test_widths():
    """
    [20, 8, 9]
    """
    verify_inline(widths(chunk([str(i) * i for i in range(1, 11)], 3)))


def test_table():
    """
    | 1  | 2  | 3  | 4  |
    | 5  | 6  | 7  | 8  |
    | 9  | 10 | 11 | 12 |
    | 13 | 14 | 15 | 16 |
    | 17 | 18 | 19 | 20 |
    | 21 | 22 | 23 |    |
    """
    verify_inline(table(chunk([str(i) for i in range(1, 24)], 4)))


def fizzbuzz(up_to=25):
    def fb(i):
        return (
            "FizzBuzz"
            if i % 15 == 0
            else "Fizz"
            if i % 3 == 0
            else "Buzz"
            if i % 5 == 0
            else str(i)
        )

    return table(chunk([fb(i) for i in range(1, up_to + 1)], 11))


def test_fizzbuzz():
    """
    | 1        | 2        | Fizz | 4        | Buzz     | Fizz | 7    | 8        | Fizz     | Buzz | 11   |
    | Fizz     | 13       | 14   | FizzBuzz | 16       | 17   | Fizz | 19       | Buzz     | Fizz | 22   |
    | 23       | Fizz     | Buzz | 26       | Fizz     | 28   | 29   | FizzBuzz | 31       | 32   | Fizz |
    | 34       | Buzz     | Fizz | 37       | 38       | Fizz | Buzz | 41       | Fizz     | 43   | 44   |
    | FizzBuzz | 46       | 47   | Fizz     | 49       | Buzz | Fizz | 52       | 53       | Fizz | Buzz |
    | 56       | Fizz     | 58   | 59       | FizzBuzz | 61   | 62   | Fizz     | 64       | Buzz | Fizz |
    | 67       | 68       | Fizz | Buzz     | 71       | Fizz | 73   | 74       | FizzBuzz | 76   | 77   |
    | Fizz     | 79       | Buzz | Fizz     | 82       | 83   | Fizz | Buzz     | 86       | Fizz | 88   |
    | 89       | FizzBuzz | 91   | 92       | Fizz     | 94   | Buzz | Fizz     | 97       | 98   | Fizz |
    | Buzz     | 101      |      |          |          |      |      |          |          |      |      |
    """
    verify_inline(fizzbuzz(101))
