import math
from approvaltests import verify, Options
from log_update import LogUpdate

import random

random.seed(8264)


class Board:
    def __init__(self):
        self.score = 0
        self.board = [" "] * 16
        self.down = lambda: self.move(self.collapse_down)
        self.up = lambda: self.move(self.collapse_up)
        self.left = lambda: self.move(self.collapse_left)
        self.right = lambda: self.move(self.collapse_right)
        self.add()
        self.score = 0

    def done(self):
        return all([done(self.board[i : i + 4]) for i in range(0, 16, 4)]) and all(
            [done(self.board[i::4]) for i in range(4)]
        )

    def add(self):
        if len(compact(self.board)) == 16:
            return
        while True:
            i = random.choice(range(16))
            if self.board[i] == " ":
                self.board[i] = "0"
                self.score += 1
                return

    def move(self, collapse_fn):
        s = str(self)
        collapse_fn()
        if str(self) != s:
            self.add()

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
        log_2_score = math.log2(self.score) if self.score > 0 else 0
        d = " game over" if self.done() else ""
        return (
            f"{log_2_score:.3f} {d}"
            + "\n"
            + "\n".join(
                ["|" + "".join(self.board[i : i + 4]) + "|" for i in range(0, 16, 4)]
            )
        )

    def sum(self):
        return sum([(int(c) + 1) for c in self.board if c != " "])


import keyboard
from log_update import LogUpdate
import random
import time

# Your existing Board class definition remains unchanged


def test_collapse_up():
    """
    0.000
    |0   |
    |    |
    |    |
    |    |
    ------
    0.000
    |0   |
    |    |
    |    |
    |   0|
    ------
    1.000
    |00 0|
    |    |
    |    |
    |    |
    ------
    1.585
    |00 0|
    |    |
    |   0|
    |    |
    ------
    2.000
    |00 1|
    |    |
    |0   |
    |    |
    ------
    2.322
    |1001|
    |    |
    |    |
    |    |
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
    0.000
    |    |
    |    |
    |   0|
    |    |
    ------
    0.000
    |    |
    |    |
    |0   |
    |   0|
    ------
    1.000
    |    |
    |    |
    |0   |
    |0  0|
    ------
    1.585
    |    |
    |    |
    |0 0 |
    |1   |
    ------
    2.000
    |    |
    |0   |
    |1   |
    |1   |
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
    0.000
    | 0  |
    |    |
    |    |
    |    |
    ------
    0.000
    |   0|
    |    |
    |    |
    |   0|
    ------
    1.000
    |   0|
    |    |
    |    |
    |  00|
    ------
    1.585
    | 0 0|
    |    |
    |    |
    |   1|
    ------
    2.000
    | 0 1|
    |    |
    |    |
    |   1|
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
    0.000
    |    |
    |  0 |
    |    |
    |    |
    ------
    0.000
    |    |
    |    |
    | 0  |
    |  0 |
    ------
    1.000
    |    |
    |    |
    |0   |
    | 00 |
    ------
    1.585
    |    |
    | 0  |
    |    |
    |000 |
    ------
    2.000
    |   0|
    |    |
    |    |
    |010 |
    ------
    2.322
    |    |
    |    |
    |0   |
    |0100|
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
    0.000
    |    |
    |0   |
    |    |
    |    |
    """
    verify(Board(), options=Options().inline())


def test_down():
    """
    0.000
    |    |
    | 0  |
    |    |
    |    |
    ------
    0.000
    |   0|
    |    |
    |    |
    | 0  |
    ------
    1.000
    | 0  |
    |    |
    |    |
    | 0 0|
    ------
    1.585
    |    |
    |    |
    |  0 |
    | 1 0|
    ------
    2.000
    |    |
    |   0|
    |    |
    | 100|
    ------
    2.322
    | 0  |
    |    |
    |    |
    | 101|
    ------
    2.585
    |    |
    |    |
    |00  |
    | 101|
    ------
    2.807
    |    |
    |0   |
    | 0  |
    |0101|
    ------
    3.000
    |    |
    | 0  |
    | 0  |
    |1101|
    ------
    3.170
    |    |
    |   0|
    | 1  |
    |1101|
    ------
    3.322
    |    |
    |    |
    |  00|
    |1201|
    ------
    3.459
    |    |
    |   0|
    |   0|
    |1211|
    ------
    3.585
    |    |
    |    |
    |  01|
    |1211|
    ------
    3.700
    | 0  |
    |    |
    |  0 |
    |1212|
    ------
    3.807
    |   0|
    |    |
    | 00 |
    |1212|
    ------
    3.907
    |0   |
    |    |
    | 000|
    |1212|
    ------
    4.000
    | 0  |
    |    |
    |0000|
    |1212|
    ------
    4.087
    |    |
    | 0  |
    |0100|
    |1212|
    ------
    4.087
    |    |
    | 0  |
    |0100|
    |1212|
    ------
    4.087
    |    |
    | 0  |
    |0100|
    |1212|
    ------
    4.087
    |    |
    | 0  |
    |0100|
    |1212|
    """
    board = Board()

    result = [str(board)]

    for i in range(20):
        board.down()
        result.append(str(board))

    verify("\n------\n".join(result), options=Options().inline())


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


def next_value(val):
    if val == "9":
        return "a"
    elif "0" <= val <= "8":
        return str(int(val) + 1)
    elif "a" <= val <= "z":
        if val != "z":
            return chr(ord(val) + 1)
        else:
            return val
    return val


def collapse(four_vector):
    c = compact(four_vector)
    i = 0
    for i in range(len(c) - 1):
        if c[i] == c[i + 1]:
            c[i] = next_value(c[i])
            c[i + 1] = " "

    c = compact(c)

    return c + [" "] * (4 - len(c))


def done(vector):
    if " " in vector:
        return False
    for i in range(len(vector) - 1):
        if vector[i] == vector[i + 1]:
            return False
    return True


def test_board_done():
    """
    6.687
    |2402|
    |4350|
    |0121|
    |1310|
    """
    board = Board()

    while not board.done():
        random.choice([board.up, board.down, board.left, board.right])()

    verify(board, options=Options().inline())


def test_done_4_vector():
    """
    .  00. -> False
    .1100. -> False
    .   1. -> False
    .00  . -> False
    .0000. -> False
    .1204. -> True
    """
    verify(
        "\n".join(
            [
                f".{v}. -> {done(list(v))}"
                for v in ["  00", "1100", "   1", "00  ", "0000", "1204"]
            ]
        ),
        options=Options().inline(),
    )


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


if __name__ == "__main__":
    board = Board()

    log_update = LogUpdate()

    def on_press(event):
        global board
        if event.name == "up":
            board.up()
        elif event.name == "down":
            board.down()
        elif event.name == "left":
            board.left()
        elif event.name == "right":
            board.right()
        elif event.name == "q":
            keyboard.unhook_all()
            exit(0)
        elif event.name == "r":
            board = Board()
        log_update.render("\n\r" + str(board))

    keyboard.on_press(on_press)

    # print("Use arrow keys to play, 'q' to quit.")
    while True:
        time.sleep(0.1)
