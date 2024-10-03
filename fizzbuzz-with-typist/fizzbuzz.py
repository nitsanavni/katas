def fizzbuzz(n, components=None):
    if components is None:
        components = [
            ("Fizz", 3),
            ("Buzz", 5),
            ("Whizz", 7),
            ("Bang", 11),
            ("Bong", 13),
        ]

    return "".join(
        [word for word, divisor in components if n % divisor == 0]) or str(n)
