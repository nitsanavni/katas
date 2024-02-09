from approvaltests import verify, Options
import inspect


def verify_inline(text):
    verify(text, options=Options().inline())


def expand(won_points_sequence: str) -> str:
    def expand_sequence(sequence: str, start: int = 0, end: int = None) -> str:
        if end is None:
            end = len(sequence)
        result = ""
        i = start
        while i < end:
            char = sequence[i]

            # Check for repetition digits
            repeat_count = ""
            while (i + 1 < end) and sequence[i + 1].isdigit():
                repeat_count += sequence[i + 1]
                i += 1  # Move to the next character

            if repeat_count:
                repeat_count = int(repeat_count)
            else:
                repeat_count = 1

            if char == "(":
                # Find the corresponding closing parenthesis
                close_paren_index = i + 1
                open_parens = 1
                while open_parens != 0:
                    if sequence[close_paren_index] == "(":
                        open_parens += 1
                    elif sequence[close_paren_index] == ")":
                        open_parens -= 1
                    close_paren_index += 1

                nested_sequence = expand_sequence(
                    sequence, i + 1, close_paren_index - 1
                )
                i = close_paren_index  # Adjust for parenthesis handling

                # Handle nested repetition
                nested_repeat_count = ""
                while (i < end) and sequence[i].isdigit():
                    nested_repeat_count += sequence[i]
                    i += 1  # Move past the digit

                if nested_repeat_count:
                    nested_repeat_count = int(nested_repeat_count)
                    result += nested_sequence * nested_repeat_count
                else:
                    result += nested_sequence
            else:
                # Handle single character or immediate repetition
                result += char * repeat_count
                i += 1  # Move to the next character

        return result

    return expand_sequence(won_points_sequence)


def verify_tennis_result(won_points_sequence: str):
    verify_inline(expand(won_points_sequence))


def test_expand():
    """
    s -> s
    r -> r
    s3 -> sss
    r3 -> rrr
    s1 -> s
    s3r2 -> sssrr
    rs3 -> rsss
    (rs)3r -> rsrsrsr
    (r(s3))2 -> rsssrsss
    s12 -> ssssssssssss
    """
    verify_inline(
        "\n".join(
            [
                f"{s} -> {expand(s)}"
                for s in [
                    "s",
                    "r",
                    "s3",
                    "r3",
                    "s1",
                    "s3r2",
                    "rs3",
                    "(rs)3r",
                    "(r(s3))2",
                    "s12",
                ]
            ]
        )
    )


def auto_inline_verify(fn):
    frame = inspect.stack()[1]
    test_fn = frame.function
    test_fn_docstring = frame.frame.f_globals[test_fn].__doc__

    print(test_fn)
    print(test_fn_docstring)

    lines = [line for line in test_fn_docstring.split("\n") if line.strip()]

    def format(arg):
        return f"{arg} -> {fn(arg)}"

    verify_inline("\n".join([format(s.split("->")[0].strip()) for s in lines]))


def test_expand_from_docstring():
    """
    s -> s
    s3 -> sss
    rs3 -> rsss
    (rs)3r -> rsrsrsr
    (r(s3))2 -> rsssrsss
    """
    auto_inline_verify(expand)


def fizzbuzz(n: str) -> str:
    n = int(n)
    result = ""
    if n % 3 == 0:
        result += "Fizz"
    if n % 5 == 0:
        result += "Buzz"
    return result or str(n)


def test_fizzbuzz_from_docstring():
    """
    1 -> 1
    2 -> 2
    3 -> Fizz
    4 -> 4
    5 -> Buzz
    6 -> Fizz
    7 -> 7
    8 -> 8
    9 -> Fizz
    10 -> Buzz
    """
    auto_inline_verify(fizzbuzz)
    # verify_inline("\n".join([str(i) for i in range(1, 11)]))


def stest_tennis():
    verify_tennis_result("sr3")
