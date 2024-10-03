def arabic_to_roman(arabic_number):
    if arabic_number > 1000:
        return "M" + arabic_to_roman(arabic_number - 1000)
    return "M"


def test_1000():
    assert arabic_to_roman(1000) == "M"


def test_2000():
    assert arabic_to_roman(2000) == "MM"
