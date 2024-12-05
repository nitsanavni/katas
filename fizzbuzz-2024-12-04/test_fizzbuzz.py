from approvaltests import verify


def fizzbuzz(number):
    return number


def test_fizzbuzz():
    verify("\n".join([f"{n} -> {fizzbuzz(n)}" for n in [1]]))
