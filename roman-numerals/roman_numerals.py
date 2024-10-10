def int_to_roman(number: int) -> str:
    roman_map = [(1000, 'M'), (900, 'CM'), (500, 'D'), (400, 'CD'), (100, 'C'), (90, 'XC'),
                 (50, 'L'), (40, 'XL'), (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')]
    result = ''
    for value, numeral in roman_map:
        while number >= value:
            result += numeral
            number -= value
    return result


print("\n".join([f"{n} -> {int_to_roman(n)}" for n in [1, 4, 9, 58, 1994]]))
