number_names = {
    1: "one",
    2: "two",
    3: "three"
}

def name_of(number):
    return number_names.get(number, None)
