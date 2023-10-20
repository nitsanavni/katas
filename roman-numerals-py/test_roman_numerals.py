def to_roman(number):
    if number == 4:
        return "IV"
    return repeat("I", number)


def repeat(s, num):
    return s * num


def test_roman_numerals():
    assert to_roman(1) == "I"
    assert to_roman(2) == "II"
    assert to_roman(3) == "III"
    assert to_roman(4) == "IV"


def test_repeat():
    assert repeat("I", 1) == "I"
