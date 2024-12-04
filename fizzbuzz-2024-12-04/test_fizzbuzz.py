from approvaltests import verify


def fizzbuzz(number):
    return 1


def test_fizzbuzz():
    verify(f"{1} -> {fizzbuzz(1)}")
