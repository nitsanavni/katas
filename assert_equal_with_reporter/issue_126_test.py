from approvaltests import assert_against_file, assert_equal_with_reporter


def test_inline_approvals():
    assert_equal_with_reporter("expected", "actual")
