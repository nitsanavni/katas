from approvaltests import verify, Options

# import from file split_code.py
from split_code import SplitCode


def verified(func):
    func.get_docstring = lambda: func.__doc__
    func.get_path = lambda: func.__code__.co_filename
    func.get_own_name = lambda: func.__name__

    return func


@verified
def greet(name):
    """
    Bob -> Hello, Bob!
    """
    return f"Hello, {name}!"


def test_verified_sees_func_name():
    """
    greet
    """
    verify(
        f"{greet.get_own_name()}",
        options=Options().inline(),
    )


def test_verified_knows_func_file():
    """
    the file of greet function: test_verified.py
    """
    verify(
        f'the file of greet function: {greet.get_path().split("/")[-1]}',
        options=Options().inline(),
    )


def test_verified_sees_func_docstring():
    """
    the docstring of greet is:
    Bob -> Hello, Bob!
    """
    verify(
        "the docstring of greet is:\n"
        + "\n".join(
            [l.strip() for l in greet.get_docstring().splitlines() if l.strip()]
        ),
        options=Options().inline(),
    )
