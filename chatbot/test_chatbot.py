from approvaltests import verify, Options
from approvaltests.reporters.reporter_that_automatically_approves import (
    ReporterThatAutomaticallyApproves as Auto,
)
from openai import OpenAI
from filecache import filecache
import subprocess

client = OpenAI()

auto_inline_options = lambda: Options().with_reporter(Auto()).inline()


system_prompt = """
you can execute python code on **my** computer
to do so, write the code bellow three dashes
any text below the three dashes will be executed as python code
!important! the code will be executed as a subprocess, so use print to output results
this is !not! a sandbox, you can execute any code, including linux commands using subprocess, feel free to explore
for multi-line strings, use triple single-quotes '''. !not! triple double-quotes
"""


@filecache(seconds_of_validity=2000)
def chat(message, previous_messages=[{"role": "system", "content": system_prompt}]):
    messages = previous_messages + [
        {"role": "user", "content": message},
    ]
    response = (
        client.chat.completions.create(model="gpt-4-turbo-preview", messages=messages)
        .choices[0]
        .message
    )
    messages = messages + [
        {
            "role": response.role,
            "content": response.content,
        }
    ]

    code_to_execute = (
        response.content.split("---")[-1].strip() if "---" in response.content else None
    )

    if code_to_execute:
        no_backticks = "\n".join(
            [line for line in code_to_execute.split("\n") if "```" not in line]
        )
        result = subprocess.run(
            ["python", "-c", no_backticks], capture_output=True, text=True
        ).stdout

        print("code_to_execute", no_backticks)
        print("result", result)

        return chat("result:\n" + result, messages)

    return messages


def chat_multi(messages):
    previous_messages = []
    for message in messages:
        previous_messages = chat(message, previous_messages)
    return previous_messages


import textwrap


def format_single_message(message, line_width):
    if message["role"] == "user":
        wrap = textwrap.TextWrapper(width=line_width)
        return "\n".join([wrap.fill(l) for l in message["content"].split("\n")])
    elif message["role"] == "system":
        return ""
    else:
        wrap = textwrap.TextWrapper(width=line_width - 8)
        wrapped = "\n".join([wrap.fill(l) for l in message["content"].split("\n")])
        left_padding = " " * 8
        right_justified = "\n".join(
            [left_padding + line for line in wrapped.split("\n")]
        )
        return right_justified


def format_messages(messages, line_width=42):
    return "\n\n".join(
        [
            format_single_message(message, line_width)
            for message in messages
            if message["role"] != "system"
        ]
    )


fm = format_messages


def test_multi_messages():
    """
    hello

            Hello! How can I assist you today?

    how are you?

            I'm just a computer program, so I
            don't have feelings, but thanks
            for asking! How can I help you
            today?
    """
    verify(fm(chat_multi(["hello", "how are you?"])), options=auto_inline_options())


def test_how_can_I_assist_you_today():
    """
    hello

            Hello! How can I assist you today?
            If you have any questions or need
            help with something, feel free to
            ask.
    """
    verify(fm(chat("hello")), options=auto_inline_options())


def test_calculate_2_plus_3():
    """
    you are a calculator! 2 + 3
    
            ---
            
            print(2 + 3)
    
    result:
    5
    
    
            Great! If you have any more
            calculations or questions, feel
            free to ask.
    """
    verify(fm(chat("you are a calculator! 2 + 3")), options=auto_inline_options())


def test_calc_huge_multiplication():
    """
    you are a calculator! 123456789 *
    987654321

            ---
            print(123456789 * 987654321)

    result:
    121932631112635269


            Yes, the product of 123,456,789
            and 987,654,321 is
            121,932,631,112,635,269.
    """
    verify(
        fm(chat("you are a calculator! 123456789 * 987654321")),
        options=auto_inline_options(),
    )


def test_ls():
    """
    ls
    
            ---
            import subprocess
            
            # Execute the 'ls' command
            result = subprocess.run(['ls'], capture_output=True,
            text=True)
            
            # Print the result of the 'ls' command to the output
            print(result.stdout)
    
    result:
    README.md
    __pycache__
    test_chatbot.py
    test_chatbot.py.cache.db
    
    
    
            It looks like the 'ls' command was executed successfully,
            showing the files and directories in the current working
            directory. If you have any more commands or Python code you'd
            like to run or have questions about, feel free to ask!
    """
    verify(fm(chat("ls"), 70), options=auto_inline_options())


def test_guess_user_name():
    """
    what is my name? you can look around using cli cmds
    
            ---
            import subprocess
            
            def run_command(command):
                process = subprocess.Popen(command, shell=True,
            stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                stdout, stderr = process.communicate()
                if process.returncode == 0:
                    return stdout.decode('utf-8').strip()
                else:
                    return stderr.decode('utf-8').strip()
            
            # Try to find the current user's name
            username = run_command("whoami")
            print(username)
    
    result:
    nitsanavni
    
    
            Your name, as derived from the system's current user name,
            appears to be "nitsanavni".
    """
    verify(
        fm(chat("what is my name? you can look around using cli cmds"), 70),
        options=auto_inline_options(),
    )


def test_tdd():
    """
    
        write a very simple function that adds two numbers
        use TDD
        reminder: make sure to see the test fail before you make it pass
        work in tiny steps, each step in a separate message
        you will be given the result of each step after execution
        run your tests often
        use python, pytest (it's already installed)
        each test should be in a separate file
        the production code should be in a separate file
        files should be super short
        all the code should be in a subfolder called './add_two_numbers' plus milliseconds
        when running the tests, only run those under that folder
        when you're done, clear the folder
        use a quiet mode for pytest
    
    
            First, let's create the initial test file for our function `add_two_numbers`. We will
            intentionally fail this test to follow the test-driven development (TDD) process.
            
            ```
            ---
            import datetime
            import os
            
            # Getting milliseconds to create a unique folder
            milliseconds = int(round(datetime.datetime.now().timestamp() * 1000))
            folder_path = f"./add_two_numbers_{milliseconds}"
            
            # Create the folder
            os.makedirs(folder_path, exist_ok=True)
            
            # Initial test file content to intentionally fail the test
            test_file_content = '''def test_add_two_numbers():
                assert add_two_numbers(1, 2) == 3
            '''
            
            # Path of the test file
            test_file_path = os.path.join(folder_path, "test_add.py")
            
            # Writing the test file
            with open(test_file_path, "w") as file:
                file.write(test_file_content)
            
            # Notify the path used
            print(f"Folder created: {folder_path}")
            print(f"Test file created: {test_file_path}")
            ```
    
    result:
    Folder created: ./add_two_numbers_1710026056706
    Test file created: ./add_two_numbers_1710026056706/test_add.py
    
    
            Next, let's proceed to run the test to see it fail as expected in the TDD process.
            
            ```
            ---
            import subprocess
            
            # Setting the command to run pytest in the created folder, specifically on our test file, in
            quiet mode.
            folder_path = "./add_two_numbers_1710026056706"
            test_command = ["pytest", f"{folder_path}/test_add.py", "-q"]
            
            # Running the command and capturing the output
            result = subprocess.run(test_command, capture_output=True, text=True)
            
            # Printing out the result of the pytest to see the expected failure
            print(result.stdout)
            print("If the output above indicates a failure, then the initial fail step of TDD is
            completed successfully.")
            ```
    
    result:
    F                                                                        [100%]
    =================================== FAILURES ===================================
    _____________________________ test_add_two_numbers _____________________________
    
        def test_add_two_numbers():
    >       assert add_two_numbers(1, 2) == 3
    E       NameError: name 'add_two_numbers' is not defined
    
    add_two_numbers_1710026056706/test_add.py:2: NameError
    =========================== short test summary info ============================
    FAILED add_two_numbers_1710026056706/test_add.py::test_add_two_numbers - Name...
    1 failed in 0.04s
    
    If the output above indicates a failure, then the initial fail step of TDD is completed
    successfully.
    
    
            Now, let's define the `add_two_numbers` function to make the test pass. We will create a
            file for the function within the same folder.
            
            ```
            ---
            # Function file content with the correct implementation
            function_file_content = '''def add_two_numbers(a, b):
                return a + b
            '''
            
            # Path of the function file
            function_file_path = "./add_two_numbers_1710026056706/add.py"
            
            # Writing the function file
            with open(function_file_path, "w") as file:
                file.write(function_file_content)
            
            # Notifying that the file has been created and the function should be defined
            print(f"Function file created: {function_file_path}")
            ```
    
    result:
    Function file created: ./add_two_numbers_1710026056706/add.py
    
    
            With the `add_two_numbers` function defined, we need to update the test file to import this
            function before we can re-run our tests and confirm the implementation works as expected.
            
            ```
            ---
            # Path of the function file and the test file
            function_file_path = "./add_two_numbers_1710026056706/add.py"
            test_file_path = "./add_two_numbers_1710026056706/test_add.py"
            
            # Updated test file content with the import statement for the function
            updated_test_file_content = '''from add import add_two_numbers
            
            def test_add_two_numbers():
                assert add_two_numbers(1, 2) == 3
            '''
            
            # Updating the test file
            with open(test_file_path, "w") as file:
                file.write(updated_test_file_content)
            
            # Notifying that the test file has been updated
            print(f"Test file updated with the import statement: {test_file_path}")
            ```
    
    result:
    Test file updated with the import statement: ./add_two_numbers_1710026056706/test_add.py
    
    
            With the test file updated to include the proper import statement for `add_two_numbers`,
            it's time to run the test again and check if it passes now.
            
            ```
            ---
            import subprocess
            
            # Setting the command to run pytest in the created folder, specifically on our test file, in
            quiet mode.
            folder_path = "./add_two_numbers_1710026056706"
            test_command = ["pytest", f"{folder_path}/test_add.py", "-q"]
            
            # Running the command and capturing the output
            result = subprocess.run(test_command, capture_output=True, text=True)
            
            # Printing out the result of the pytest to verify the pass
            print(result.stdout)
            print("If the output above indicates a pass, then our implementation is successful.")
            ```
    
    result:
    .                                                                        [100%]
    1 passed in 0.01s
    
    If the output above indicates a pass, then our implementation is successful.
    
    
            Having successfully implemented the `add_two_numbers` function and passed the test, the
            final step in our TDD process is to clean up by deleting the folder we created. This ensures
            we leave no unnecessary files or folders behind.
            
            ```
            ---
            import shutil
            
            # Path to the folder we want to delete
            folder_path = "./add_two_numbers_1710026056706"
            
            # Deleting the folder and its contents
            shutil.rmtree(folder_path)
            
            # Confirming the deletion
            print(f"Folder removed: {folder_path}")
            ```
    
    result:
    Folder removed: ./add_two_numbers_1710026056706
    
    
            Great! We've completed the TDD cycle for a simple function to add two numbers. We started by
            writing a failing test, then implemented just enough code to make the test pass, and finally
            cleaned up after ourselves by removing the temporary files and folder. Feel free to start
            another TDD cycle or ask for help on a different topic!
    """
    prompt = """
    write a very simple function that adds two numbers
    use TDD
    reminder: make sure to see the test fail before you make it pass
    work in tiny steps, each step in a separate message
    you will be given the result of each step after execution
    run your tests often
    use python, pytest (it's already installed)
    each test should be in a separate file
    the production code should be in a separate file
    files should be super short
    all the code should be in a subfolder called './add_two_numbers' plus milliseconds
    when running the tests, only run those under that folder
    when you're done, clear the folder
    use a quiet mode for pytest
    """
    verify(fm(chat(prompt), 100), options=auto_inline_options())
