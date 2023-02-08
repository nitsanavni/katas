class Fraction:
    def __init__(self, *, whole=0, nominator=0, denominator=1):
        self.whole = whole
        self.nominator = nominator
        self.denominator = denominator

    def __str__(self):
        return self.format()

    def format(self):
        if self.whole != 0:
            if self.nominator != 0:
                return f"{self.whole} {self.nominator}/{self.denominator}"
            return f"{self.whole}"
        return f"{self.nominator}/{self.denominator}"

    def add(self, other):
        return Fraction(
            whole=self.whole + other.whole,
            nominator=self.nominator * other.denominator +
            other.nominator * self.denominator,
            denominator=self.denominator * other.denominator
        )


one_and_a_half = Fraction(whole=1, nominator=1, denominator=2)
one = Fraction(whole=1)
one_half = Fraction(nominator=1, denominator=2)
fractions = [
    ('one and a half', one_and_a_half),
    ('one', one),
    ('one half', one_half),
]
combinations = [(f1, f2) for n1, f1 in fractions for n2, f2 in fractions]


def verify_add():
    """
    >>> verify_add()
    1 1/2 + 1 1/2 = 2 4/4
    1 1/2 + 1 = 2 1/2
    1 1/2 + 1/2 = 1 4/4
    1 + 1 1/2 = 2 1/2
    1 + 1 = 2
    1 + 1/2 = 1 1/2
    1/2 + 1 1/2 = 1 4/4
    1/2 + 1 = 1 1/2
    1/2 + 1/2 = 4/4
    """
    for f1, f2 in combinations:
        print(f"{f1} + {f2} = {f1.add(f2)}")


def verify_format():
    """
    >>> verify_format()
    one and a half 1 1/2
    one 1
    one half 1/2
    """
    for name, f in fractions:
        print(name, f.format())
