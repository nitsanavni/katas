from approvaltests import verify_all, Options
from approvaltests.reporters.generic_diff_reporter import GenericDiffReporter


def d():
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
    verify_all(
        None,
        range(1, 17),
        lambda n: f"{n} -> {fizzbuzz(n)}",
        options=Options().with_reporter(d()),
    )
