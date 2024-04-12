from approvaltests import verify as v, Options
from approvaltests.reporters.reporter_that_automatically_approves import (
    ReporterThatAutomaticallyApproves as Auto,
)
import random

from reproducible import reproducible


def verify(*args, **kwargs):
    v(*args, options=Options().with_reporter(Auto()).inline(), **kwargs)


@reproducible
def doing_random_things():
    return random.random()


@reproducible
def doing_other_random_things():
    return random.random()


def test_reproducible():
    """
    0.370
    0.935
    0.683
    0.149
    0.130
    0.662
    0.275
    0.727
    0.120
    0.748
    """
    verify(
        "\n".join(
            [
                "\n".join([f"{func():.3f}" for _ in range(5)])
                for func in [doing_random_things, doing_other_random_things]
            ]
        )
    )
