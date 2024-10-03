#!/usr/bin/env python3

def fizzbuzz(n):
    """Prints the FizzBuzz sequence up to a number n."""
    for i in range(1, n + 1):
        if i % 3 == 0 and i % 5 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        elif i % 7 == 0:
            print("seven")
        else:
            print(i)


if __name__ == "__main__":
    # Example: print FizzBuzz sequence up to 15
    fizzbuzz(15)
