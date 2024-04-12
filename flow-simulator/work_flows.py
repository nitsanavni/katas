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
from filecache import filecache


def make_rand():
    sample = 0

    @filecache
    def r(min, max, sample):
        return min + (max - min) * random.random()

    def ret(min, max):
        nonlocal sample
        sample += 1
        return r(min, max, sample)

    return ret


rand = make_rand()


def test_rand():
    """
    1.2383511314943436
    0.9147438225748854
    1.1743273635374787
    2.0901428039388725
    0.546973027650977
    1.3432958848848304
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
