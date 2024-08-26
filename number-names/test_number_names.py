number_names = {
    1: "one",
    2: "two",
    3: "three"
}

def name_of(number):
    return number_names.get(number, None)

def test_number_names():
    assert name_of(1) == "one"
    assert name_of(2) == "two"
    assert name_of(3) == "three"
