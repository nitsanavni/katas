from approvaltests import verify
from approvaltests.reporters import GenericDiffReporter, create_config


def test_approvals_in_gitpod():
    gp_reporter = GenericDiffReporter(create_config(["gp", "code", ["-d"]]))
    verify(
        "Hello world!",
        reporter=gp_reporter,
    )
