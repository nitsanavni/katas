#!/usr/bin/env python3

def fizzbuzz(n):
    """Prints the FizzBuzz sequence up to a number n."""
    for i in range(1, n + 1):
        output = ""
        if i % 3 == 0:
            output += "Fizz"
        if i % 5 == 0:
            output += "Buzz"
        if i % 7 == 0:
            output += "seven"
        print(output if output else i)


if __name__ == "__main__":
    # Example: print FizzBuzz sequence up to 15
    fizzbuzz(15)
