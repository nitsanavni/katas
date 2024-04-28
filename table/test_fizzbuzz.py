from approvaltests import verify as v, Options

from test_table import chunk, table

def verify(data):
    v(data, options=Options().inline())


fizzbuzz_rules = {
    3: "Fizz",
    5: "Buzz"
}
    
        
def make_fizzbuzz(rules=fizzbuzz_rules):
    def fizzbuzz(number):
        return "".join(rules[divisor] for divisor in sorted(rules) if number % divisor == 0) or str(number)
    return fizzbuzz




def test_fizzbuzz():
    """
    | 1    | 2    | Fizz     | 4    | Buzz | Fizz     |
    | 7    | 8    | Fizz     | Buzz | 11   | Fizz     |
    | 13   | 14   | FizzBuzz | 16   | 17   | Fizz     |
    | 19   | Buzz | Fizz     | 22   | 23   | Fizz     |
    | Buzz | 26   | Fizz     | 28   | 29   | FizzBuzz |
    | 31   | 32   | Fizz     | 34   | Buzz | Fizz     |
    | 37   | 38   | Fizz     | Buzz | 41   | Fizz     |
    | 43   | 44   | FizzBuzz | 46   | 47   | Fizz     |
    | 49   | Buzz | Fizz     | 52   | 53   | Fizz     |
    | Buzz | 56   | Fizz     | 58   | 59   | FizzBuzz |
    | 61   | 62   | Fizz     | 64   |      |          |
    """
    verify(table(chunk([make_fizzbuzz()(n) for n in range(1,65)], 6)))

