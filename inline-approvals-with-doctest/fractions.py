class Fraction:
    def __init__(self, *, whole=0, nominator=0, denominator=1):
        self.whole = whole
        self.nominator = nominator
        self.denominator = denominator

    def format(self):
        return f"{f'{self.whole} ' if self.whole != 0 else ''}{f'{self.nominator}/{self.denominator}' if self.nominator != 0 else ''}"


one_and_a_half = Fraction(whole=1, nominator=1, denominator=2)
one = Fraction(whole=1)
one_half = Fraction(nominator=1, denominator=2)


def t_format():
    """
    >>> t_format()
    one and a half 1 1/2
    one 1 
    one half 1/2
    """
    fractions = [
        ['one and a half', one_and_a_half],
        ['one', one],
        ['one half', one_half],
    ]
    for name, f in fractions:
        print(name, f.format())


def fail_to_always_regenerates_the_diff():
    """
    >>> 1
    """
