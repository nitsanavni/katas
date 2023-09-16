import unittest
from approvals import ApprovalTest

from fizzbuzz import fizzbuzz


class FizzBuzzTest(ApprovalTest):
    def test_fizzbuzz(self):
        lines = [f"{n} -> {fizzbuzz(n)}" for n in range(1, 6)]
        return lines
