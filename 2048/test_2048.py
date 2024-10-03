import math
from approvaltests import verify, Options
from log_update import LogUpdate

import random

random.seed(8264)


def alternative_score(score):
    if score == 0:
        return "0"

    ret = ""

    start = 2
    while score > 0:
        start = int(math.log2(score))
        ret += str(start) if start < 10 else chr(start + 87)
        score -= 2**start

    return ret


class Board:
    def __init__(self):
        self.down = lambda: self.move(self.collapse_down)
        self.up = lambda: self.move(self.collapse_up)
        self.left = lambda: self.move(self.collapse_left)
        self.right = lambda: self.move(self.collapse_right)
        self.reset()

    def done(self):
        return all([done(self.board[i : i + 4]) for i in range(0, 16, 4)]) and all(
            [done(self.board[i::4]) for i in range(4)]
        )

    def reset(self):
        self.score = 0
        self.board = [" "] * 16
        self.add()
        self.score = 0

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
        log_2_score = math.log2(self.score + 1) if self.score > 0 else 0
        d = " game over" if self.done() else ""
        return (
            f"{log_2_score:.3f}{d}\n"
            + f"{alternative_score(self.score+1)}\n"
            + "\n".join(
                ["|" + "".join(self.board[i : i + 4]) + "|" for i in range(0, 16, 4)]
            )
        )

    def sum(self):
        return sum([(int(c) + 1) for c in self.board if c != " "])


def test_alternative_score():
    """
    0 -> 0
    1 -> 0
    2 -> 1
    3 -> 10
    4 -> 2
    5 -> 20
    6 -> 21
    7 -> 210
    8 -> 3
    9 -> 30
    1000 -> 987653
    1200 -> a754
    1400 -> a86543
    1600 -> a96
    1800 -> a983
    2000 -> a98764
    2200 -> b743
    2400 -> b865
    """

    verify(
        "\n".join(
            [
                f"{i} -> {alternative_score(i)}"
                for i in (list(range(10)) + list(range(1000, 2500, 200)))
            ]
        ),
        options=Options().inline(),
    )


import keyboard
from log_update import LogUpdate
import random
import time


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
    0
    |    |
    |  0 |
    |    |
    |    |
    ------
    1.000
    1
    |    |
    |    |
    | 0  |
    |  0 |
    ------
    1.585
    10
    |    |
    |    |
    |0   |
    | 00 |
    ------
    2.000
    2
    |    |
    | 0  |
    |    |
    |000 |
    ------
    2.322
    20
    |   0|
    |    |
    |    |
    |010 |
    ------
    2.585
    21
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
    0
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
    6.109 game over
    |0131|
    |4310|
    |0132|
    |1320|
    ------
    7.066 game over
    |0231|
    |1450|
    |3542|
    |1021|
    ------
    7.011 game over
    |2310|
    |3541|
    |2123|
    |1205|
    ------
    7.022 game over
    |1610|
    |2321|
    |1432|
    |0320|
    ------
    6.190 game over
    |0420|
    |3041|
    |1312|
    |0121|
    ------
    6.409 game over
    |0310|
    |1202|
    |3531|
    |1310|
    ------
    7.033 game over
    |1320|
    |5453|
    |3121|
    |1310|
    ------
    7.109 game over
    |2021|
    |0165|
    |1420|
    |0101|
    ------
    6.600 game over
    |3010|
    |0343|
    |2151|
    |1310|
    ------
    7.238 game over
    |0104|
    |1242|
    |4164|
    |1020|
    """
    board = Board()

    def random_move():
        random.choice([board.up, board.down, board.left, board.right])()

    def random_play_until_done():
        board.reset()
        while not board.done():
            random_move()
        return board

    verify(
        "\n------\n".join([str(random_play_until_done()) for _ in range(10)]),
        options=Options().inline(),
    )


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
