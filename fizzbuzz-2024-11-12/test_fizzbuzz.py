from approvaltests import verify, Options
from approvaltests.reporters.generic_diff_reporter import GenericDiffReporter


def diff_reporter():
    return GenericDiffReporter.create("d.sh")


def fizzbuzz(n):
    if n % 15 == 0:
        return "FizzBuzz"
    elif n % 3 == 0:
        return "Fizz"
    elif n % 5 == 0:
        return "Buzz"
    else:
        return n


def test_fizzbuzz():
    verify(
        "\n".join([f"{i} -> {fizzbuzz(i)}" for i in range(1, 16)]),
        options=Options().with_reporter(diff_reporter()),
    )
