from approvaltests import verify
from approvaltests.reporters import GenericDiffReporter, create_config

def test_approvals_in_gitpod():
    verify("Hello world!", reporter=GenericDiffReporter(create_config(["gp", "code", ["-d"]])))
