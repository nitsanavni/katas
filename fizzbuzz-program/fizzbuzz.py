def clever_fizzbuzz(number):
    """
    default:
    n -> n (identity)
    except when n is divisible by 3 or/and 5:
    3, 6, 9, etc. -> Fizz
    5, 10, etc. -> Buzz
    3 and 5 (e.g. 15) -> FizzBuzz
    """

    default_result = number

    divisible = lambda *, by: number % by == 0

    part = lambda *, word, divisor: word if divisible(by=divisor) else ""

    fizz = part(word="Fizz", divisor=3)
    buzz = part(word="Buzz", divisor=5)
    whizz = part(word="Whizz", divisor=7)
    bang = part(word="Bang", divisor=11)

    # too clever code, that takes advantage of the fact that
    # "FizzBuzz" == "Fizz" + "Buzz"
    # "Fizz" == "Fizz" + ""
    # "Buzz" == "" + "Buzz"
    special_cases_result = fizz + buzz + whizz + bang

    return special_cases_result or default_result


def straight_forward_fizzbuzz(number):
    if number % 3 == 0 and number % 5 == 0 and number % 7 == 0:
        return "FizzBuzzWhizz"
    if number % 3 == 0 and number % 5 == 0:
        return "FizzBuzz"
    if number % 3 == 0 and number % 7 == 0:
        return "FizzWhizz"
    if number % 3 == 0 and number % 11 == 0:
        return "FizzBang"
    if number % 5 == 0 and number % 7 == 0:
        return "BuzzWhizz"
    if number % 5 == 0 and number % 11 == 0:
        return "BuzzBang"
    if number % 7 == 0 and number % 11 == 0:
        return "WhizzBang"
    if number % 3 == 0:
        return "Fizz"
    if number % 5 == 0:
        return "Buzz"
    if number % 7 == 0:
        return "Whizz"
    if number % 11 == 0:
        return "Bang"
    return number


def coin_flip():
    from random import choice

    return choice([True, False])


fizzbuzz = clever_fizzbuzz if coin_flip() else straight_forward_fizzbuzz


def fizzbuzz_program():
    def print_fizzbuzz_up_to(max_number):
        [print(fizzbuzz(number)) for number in range(1, max_number + 1)]

    print_fizzbuzz_up_to(100)


if __name__ == "__main__":
    fizzbuzz_program()
