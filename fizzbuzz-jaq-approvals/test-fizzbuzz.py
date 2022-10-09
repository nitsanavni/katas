from approvaltests.utilities.command_line_approvals import verify_command_line, verify_command_line_with_inputs
import command


def test_fizzbuzz_verify_range_1_to_100():
    verify_command_line("jaq -n 'range(100) | .+1' | jaq -f fizzbuzz.jq")
    verify_command_line_with_inputs("jaq -f fizzbuzz.jq",inputs=range(1,101))
    # verify(command.run(
        # ["bash", "-c", "jaq -n 'range(100) | .+1' | jaq -f fizzbuzz.jq"]).output.decode("utf8"))
