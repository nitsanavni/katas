from number_names import name_of

def test_number_names():
    assert name_of(1) == "one"
    assert name_of(2) == "two"
    assert name_of(3) == "three"
