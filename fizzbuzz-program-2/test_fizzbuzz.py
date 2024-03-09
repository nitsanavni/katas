def fizzbuzz(number):
    if number % 3 == 0 and number % 5 == 0:
        return "FizzBuzz"
    if number % 3 == 0:
        return "Fizz"
    if number % 5 == 0:
        return "Buzz"
    return number


if __name__ == "__main__":
    [print(fizzbuzz(number)) for number in range(1, 100 + 1)]


from approvaltests import verify, Options
from approvaltests.reporters.reporter_that_automatically_approves import (
    ReporterThatAutomaticallyApproves as Auto,
)
import subprocess


auto_inline = (lambda: Options().with_reporter(Auto()).inline(show_code=False))()


def run_this_program():
    return subprocess.run(["python", __file__], capture_output=True, text=True).stdout


def test_this_program():
    """
    1 -> 1
    2 -> 2
    3 -> Fizz
    4 -> 4
    5 -> Buzz
    6 -> Fizz
    9 -> Fizz
    10 -> Buzz
    14 -> 14
    15 -> FizzBuzz
    16 -> 16
    45 -> FizzBuzz
    98 -> 98
    99 -> Fizz
    100 -> Buzz
    """
    verify(
        "\n".join(
            [
                f"{line_number+1} -> {line}"
                for line_number, line in enumerate(run_this_program().splitlines())
                if (
                    line_number < 6
                    or line_number > 96
                    or line_number + 1 == 9
                    or line_number + 1 == 10
                    or line_number + 1 == 14
                    or line_number + 1 == 15
                    or line_number + 1 == 16
                    or line_number + 1 == 45
                )
            ]
        ),
        options=auto_inline,
    )
