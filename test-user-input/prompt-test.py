import subprocess


def test_c_program():
    # Create variables to hold the input
    input_data = "Nitsan Avni\n41\n"
    # Run the C program and provide the input via stdin
    completed_process = subprocess.run(
        ["./a.out", ], input=input_data, capture_output=True, text=True)
    # Get the stdout
    output = completed_process.stdout
    # Get the stderr
    error = completed_process.stderr
    # check if the program ran successfully
    if completed_process.returncode != 0:
        print("An error has occurred:", error)
        return

    # check if the output matches the expected output
    expected_output = "What is your name?\nWhat is your age?\nHello, Nitsan Avni, You are 41 years old!\n"
    if output != expected_output:
        print("Output does not match the expected output.")
        print("Expected output:", expected_output)
        print("Actual output:", output)
        return

    print("Test passed!")


test_c_program()
