from approvaltests.utilities.command_line_approvals import verify_command_line, verify_command_line_with_inputs


def test_fizzbuzz_verify_range_1_to_100():
    verify_command_line_with_inputs("jaq -f fizzbuzz.jq", inputs=range(1, 101))
