from approvaltests import verify, Options
from approvaltests.reporters.reporter_that_automatically_approves import (
    ReporterThatAutomaticallyApproves as Auto,
)


def sim(backlog, people):
    total = 0
    while backlog > 0:
        backlog -= people
        total += 1

    return {"total": total}


def test_sim_one_person_one_item():
    """
    1,1->{'total': 1}
    2,1->{'total': 2}
    1,2->{'total': 1}
    3,2->{'total': 2}
    3,4->{'total': 1}
    """
    verify(
        "\n".join(
            [
                f"{backlog},{people}->{sim(backlog, people)}"
                for backlog, people in [(1, 1), (2, 1), (1, 2), (3, 2), (3, 4)]
            ]
        ),
        options=Options().with_reporter(Auto()).inline(),
    )


import random

from reproducible import reproducible


@reproducible
def rand(a, b):
    return random.uniform(a, b)


def test_rand():
    """
    2.617159389667221
    1.1478830982036143
    2.5553596946849457
    0.8398872670793651
    0.67705302889414
    1.7658263677548296
    """
    verify(
        "\n".join([str(rand(0.5, 3.1)) for _ in range(6)]),
        options=Options().with_reporter(Auto()).inline(),
    )


def sim_two_stages():
    number_of_items = 5
    items = []


def test_sim_two_stages():
    """
    None
    """
    verify(sim_two_stages(), options=Options().with_reporter(Auto()).inline())
