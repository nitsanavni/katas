from approvaltests import verify, Options
from verified import verified


@verified
def greet(name):
    """
    Bob -> Hello, Bob!
    Biba -> Hello, Biba!
    """
    return f"Hello, {name}!"


test_verified_with_verify = greet.verify


def stest_verified_assert_same_docstring():
    greet.assert_same_docstring()


def stest_verified_reformats_docstring():
    """
    Bob -> Hello, Bob!
    Biba -> Hello, Biba!
    """
    verify(
        greet.reformat_docstring(),
        options=Options().inline(),
    )


def stest_verified_inputs():
    """
    Bob
    Biba
    """
    verify(
        "\n".join(greet.inputs()),
        options=Options().inline(),
    )


def stest_verified_sees_func_name():
    """
    greet
    """
    verify(
        f"{greet.get_own_name()}",
        options=Options().inline(),
    )


def stest_verified_knows_func_file():
    """
    the file of greet function: test_verified.py
    """
    verify(
        f'the file of greet function: {greet.get_path().split("/")[-1]}',
        options=Options().inline(),
    )


def stest_verified_sees_func_docstring():
    """
    the docstring of greet is:
    Bob -> Hello, Bob!
    Biba -> Hello, Biba!
    """
    verify(
        "the docstring of greet is:\n"
        + "\n".join(
            [l.strip() for l in greet.get_docstring().splitlines() if l.strip()]
        ),
        options=Options().inline(),
    )
