from approvaltests import verify


def fizzbuzz(number):
    return 1


def test_fizzbuzz():
    verify("\n".join([f"{n} -> {fizzbuzz(n)}" for n in [1]]))
