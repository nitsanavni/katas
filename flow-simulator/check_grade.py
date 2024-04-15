from approvaltests import verify as v, Options
from approvaltests.reporters.reporter_that_automatically_approves import (
    ReporterThatAutomaticallyApproves as Auto,
)


def verify(*args, **kwargs):
    v(*args, options=Options().with_reporter(Auto()).inline(), **kwargs)


def check_grade(score):
    grades = {
        "A": lambda: 90 <= score,
        "B": lambda: 80 <= score < 90,
        "C": lambda: 70 <= score < 80,
        "D": lambda: 60 <= score < 70,
        "F": lambda: score < 60,
    }

    return (grade for grade, condition in grades.items() if condition()).__next__()


def test_check_grade():
    """
    95 -> A
    85 -> B
    75 -> C
    65 -> D
    55 -> F
    """
    verify(
        "\n".join(
            [f"{score} -> {check_grade(score)}" for score in [95, 85, 75, 65, 55]]
        )
    )
