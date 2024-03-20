from tennis6 import TennisGame6

from approvaltests import verify
from itertools import product


def test_tennis6():
    def score(p1, p2):
        game = TennisGame6("player1", "player2")
        for _ in range(p1):
            game.won_point("player1")
        for _ in range(p2):
            game.won_point("player2")
        return game.score()

    verify(
        "\n".join(
            [f"{p1}, {p2} -> {score(p1,p2)}" for p1, p2 in product(range(5), repeat=2)]
        )
    )
