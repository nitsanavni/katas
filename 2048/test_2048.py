from approvaltests import verify, Options

import random

random.seed(8264)


class Board:
    def __init__(self):
        self.board = [" "] * 16
        self.add()

    def add(self):
        while True:
            i = random.choice(range(16))
            if self.board[i] == " ":
                self.board[i] = "0"
                return

    def collapse_left(self):
        for i in range(0, 16, 4):
            self.board[i : i + 4] = collapse(self.board[i : i + 4])

    def collapse_right(self):
        for i in range(0, 16, 4):
            self.board[i : i + 4] = collapse(self.board[i : i + 4][::-1])[::-1]

    def collapse_up(self):
        for i in range(4):
            self.board[i::4] = collapse(self.board[i::4])

    def collapse_down(self):
        for i in range(4):
            self.board[i::4] = collapse(self.board[i::4][::-1])[::-1]

    def __str__(self):
        return "\n".join(
            ["." + "".join(self.board[i : i + 4]) + "." for i in range(0, 16, 4)]
        )


def test_collapse_up():
    """
    .0   .
    .    .
    .    .
    .    .
    ------
    .0   .
    .    .
    .    .
    .   0.
    ------
    .00 0.
    .    .
    .    .
    .    .
    ------
    .00 0.
    .    .
    .   0.
    .    .
    ------
    .00 1.
    .    .
    .0   .
    .    .
    ------
    .1001.
    .    .
    .    .
    .    .
    """
    board = Board()

    result = [str(board)]

    for i in range(5):
        board.collapse_up()
        board.add()
        result.append(str(board))

    verify("\n------\n".join(result), options=Options().inline())


def test_collapse_left():
    """
    .    .
    .    .
    .   0.
    .    .
    ------
    .    .
    .    .
    .0   .
    .   0.
    ------
    .    .
    .    .
    .0   .
    .0  0.
    ------
    .    .
    .    .
    .0 0 .
    .1   .
    ------
    .    .
    .0   .
    .1   .
    .1   .
    """
    board = Board()

    result = [str(board)]

    for i in range(4):
        board.collapse_left()
        board.add()
        result.append(str(board))

    verify("\n------\n".join(result), options=Options().inline())


def test_collapse_right():
    """
    . 0  .
    .    .
    .    .
    .    .
    ------
    .   0.
    .    .
    .    .
    .   0.
    ------
    .   0.
    .    .
    .    .
    .  00.
    ------
    . 0 0.
    .    .
    .    .
    .   1.
    ------
    . 0 1.
    .    .
    .    .
    .   1.
    """
    board = Board()

    result = [str(board)]

    for i in range(4):
        board.collapse_right()
        board.add()
        result.append(str(board))

    verify("\n------\n".join(result), options=Options().inline())


def test_collapse_down():
    """
    .    .
    .  0 .
    .    .
    .    .
    ------
    .    .
    .    .
    . 0  .
    .  0 .
    ------
    .    .
    .    .
    .0   .
    . 00 .
    ------
    .    .
    . 0  .
    .    .
    .000 .
    ------
    .   0.
    .    .
    .    .
    .010 .
    ------
    .    .
    .    .
    .0   .
    .0100.
    """
    board = Board()

    result = [str(board)]

    for i in range(5):
        board.collapse_down()
        board.add()
        result.append(str(board))

    verify("\n------\n".join(result), options=Options().inline())


def test_board():
    """
    .    .
    .0   .
    .    .
    .    .
    """
    verify(Board(), options=Options().inline())


def compact(vector):
    return [c for c in vector if c != " "]


def test_compact():
    """
    .0.
    .00.
    .1234.
    """
    verify(
        "\n".join(
            ["." + "".join(compact(v.split())) + "." for v in ["  0 ", "0 0 ", "1234"]]
        ),
        options=Options().inline(),
    )


def collapse(four_vector):
    c = compact(four_vector)
    i = 0
    for i in range(len(c) - 1):
        if c[i] == c[i + 1]:
            c[i] = str(int(c[i]) + 1)
            c[i + 1] = " "

    c = compact(c)

    return c + [" "] * (4 - len(c))


def test_collapse_4_vector():
    """
    .  00. -> .1   .
    .1100. -> .21  .
    .   1. -> .1   .
    .00  . -> .1   .
    .0000. -> .11  .
    """
    verify(
        "\n".join(
            [
                "." + v + ". -> ." + "".join(collapse(list(v))) + "."
                for v in ["  00", "1100", "   1", "00  ", "0000"]
            ]
        ),
        options=Options().inline(),
    )


def stest_down():
    board = Board()

    before = str(board)

    board.down()

    verify("\n------\n".join([before, board]), options=Options().inline())
