default_c_code = """
int main() {
    return 0;
}
"""


def build_and_exec(code=default_c_code):
    import tempfile

    executable = tempfile.mktemp(dir=".")

    is_file = "\n" not in code and code.endswith(".c")

    source_file = code if is_file else executable + ".c"

    if not is_file:
        with open(source_file, "w") as f:
            f.write(code)

    import os

    os.system(f"gcc -o {executable} {source_file}")

    if not is_file:
        os.remove(source_file)

    import subprocess

    result = subprocess.check_output([f"./{executable}"]).strip().decode("utf-8")

    os.remove(executable)

    return result


run = build_and_exec


def hello_world():
    hello_world_code = """
        #include <stdio.h>

        int main() {
            printf("Hello, world!\\n");
            return 0;
        }
    """

    return run(hello_world_code)


def test_hello_world():
    assert hello_world() == "Hello, world!"


from approvaltests import verify as original_verify, Options
from approvaltests.reporters.reporter_that_automatically_approves import (
    ReporterThatAutomaticallyApproves as Auto,
)

options = Options().with_reporter(Auto()).inline()


def verify_c_code(*, c_code):
    original_verify(run(code=c_code), options=options)


verify = verify_c_code


def test_fizzbuzz():
    """
    1
    2
    Fizz
    4
    Buzz
    Fizz
    7
    8
    Fizz
    Buzz
    11
    Fizz
    13
    14
    FizzBuzz
    16
    17
    Fizz
    19
    Buzz
    Fizz
    22
    23
    Fizz
    Buzz
    26
    Fizz
    28
    29
    FizzBuzz
    31
    32
    Fizz
    34
    Buzz
    Fizz
    37
    38
    Fizz
    Buzz
    41
    Fizz
    43
    44
    FizzBuzz
    46
    47
    Fizz
    49
    Buzz
    Fizz
    52
    53
    Fizz
    Buzz
    56
    Fizz
    58
    59
    FizzBuzz
    61
    62
    Fizz
    64
    Buzz
    Fizz
    67
    68
    Fizz
    Buzz
    71
    Fizz
    73
    74
    FizzBuzz
    76
    77
    Fizz
    79
    Buzz
    Fizz
    82
    83
    Fizz
    Buzz
    86
    Fizz
    88
    89
    FizzBuzz
    91
    92
    Fizz
    94
    Buzz
    Fizz
    97
    98
    Fizz
    Buzz
    """
    fizzbuzz_code = """
        #include <stdio.h>

        int main() {
            for (int i = 1; i <= 100; i++) {
                if (i % 3 == 0 && i % 5 == 0) {
                    printf("FizzBuzz\\n");
                } else if (i % 3 == 0) {
                    printf("Fizz\\n");
                } else if (i % 5 == 0) {
                    printf("Buzz\\n");
                } else {
                    printf("%d\\n", i);
                }
            }
            return 0;
        }
    """
    verify(c_code=fizzbuzz_code)
    verify(c_code="./fizzbuzz.c")
