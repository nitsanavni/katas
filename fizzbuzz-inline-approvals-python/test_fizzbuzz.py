from approvaltests import verify, Options
from approvaltests.reporters import ReporterThatAutomaticallyApproves


def fizzbuzz(up_to=25):
    def fb(i):
        return (
            "FizzBuzz"
            if i % 15 == 0
            else "Fizz"
            if i % 3 == 0
            else "Buzz"
            if i % 5 == 0
            else str(i)
        )

    # draw a table, each row has up to 5 cells
    # each cell is the result of fb(i) for i in range(row * 5, row * 5 + 5)
    s = 10
    rows = [
        [fb(i) for i in range(row * s + 1, row * s + s + 1)]
        for row in range(up_to // s)
    ]

    # find max width for each column
    widths = [max(len(cell) for cell in col) for col in zip(*rows)]

    # format each cell with the right width
    rows = [[cell.ljust(widths[i]) for i, cell in enumerate(row)] for row in rows]

    # join each row with a pipe, including the edges
    rows = ["|" + "|".join(row) + "|" for row in rows]

    # join all rows with a newline
    return "\n".join(rows)


def test_fizzbuzz():
    """
    |1   |2   |Fizz|4   |Buzz    |Fizz|7   |8   |Fizz|Buzz    |
    |11  |Fizz|13  |14  |FizzBuzz|16  |17  |Fizz|19  |Buzz    |
    |Fizz|22  |23  |Fizz|Buzz    |26  |Fizz|28  |29  |FizzBuzz|
    |31  |32  |Fizz|34  |Buzz    |Fizz|37  |38  |Fizz|Buzz    |
    |41  |Fizz|43  |44  |FizzBuzz|46  |47  |Fizz|49  |Buzz    |
    |Fizz|52  |53  |Fizz|Buzz    |56  |Fizz|58  |59  |FizzBuzz|
    |61  |62  |Fizz|64  |Buzz    |Fizz|67  |68  |Fizz|Buzz    |
    |71  |Fizz|73  |74  |FizzBuzz|76  |77  |Fizz|79  |Buzz    |
    |Fizz|82  |83  |Fizz|Buzz    |86  |Fizz|88  |89  |FizzBuzz|
    |91  |92  |Fizz|94  |Buzz    |Fizz|97  |98  |Fizz|Buzz    |
    """
    verify(
        fizzbuzz(101),
        options=Options().with_reporter(ReporterThatAutomaticallyApproves()).inline(),
    )
