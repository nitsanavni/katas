
def fizzbuzz(n):
    specs = [[3, "Fizz"], [5, "Buzz"], [7, "Whizz"]]
    result = ''.join(string for divisor, string in specs if n % divisor == 0)
    return result or str(n)

def t_fizzbuzz():
    """
    >>> t_fizzbuzz()
    1 2 Fizz 4 Buzz Fizz Whizz 8 Fizz Buzz 11 Fizz 13 Whizz FizzBuzz
    """

    print(' '.join(map(fizzbuzz, range(1,22))))

def fail_so_it_always_regenerates_the_diff():
    """
    >>> 1
    """
