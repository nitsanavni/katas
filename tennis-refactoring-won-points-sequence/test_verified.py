from approvaltests import verify, Options


def verified(func):
    func.get_docstring = lambda: func.__doc__

    return func


@verified
def greet(name):
    """
    Bob -> Hello, Bob!
    """
    return f"Hello, {name}!"


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
