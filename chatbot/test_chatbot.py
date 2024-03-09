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
!important! don't use backticks to format your code, no markdown code blocks
!important! the code will be executed as a subprocess, so use print to output results
this is !not! a sandbox, you can execute any code, including linux commands using subprocess, feel free to explore
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
        result = subprocess.run(
            ["python", "-c", code_to_execute], capture_output=True, text=True
        ).stdout

        print("code_to_execute", code_to_execute)
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
            free to ask!
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


            Indeed, the result of multiplying
            123456789 by 987654321 is
            121932631112635269. If you have
            any more calculations or
            questions, feel free to ask!
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
            
            # Using subprocess to execute the 'ls' command in the current
            directory
            result = subprocess.run(["ls"], capture_output=True,
            text=True)
            print(result.stdout)
    
    result:
    README.md
    __pycache__
    test_chatbot.py
    test_chatbot.py.cache.db
    
    
    
            It appears that the current directory contains the following
            files and folders:
            
            - `README.md`: A Markdown file, likely containing
            documentation or an introduction to the directory's contents.
            - `__pycache__`: A directory used by Python to store compiled
            bytecode files, improving the loading time of modules.
            - `test_chatbot.py`: A Python script, possibly for testing a
            chatbot implementation.
            - `test_chatbot.py.cache.db`: Likely a database file related
            to `test_chatbot.py`, possibly storing test results or data
            used by the script.
    """
    verify(fm(chat("ls"), 70), options=auto_inline_options())


def test_guess_user_name():
    """
    what is my name? you can look around using cli cmds
    
            ---
            import subprocess
            
            def get_username():
                result = subprocess.run(['whoami'],
            stdout=subprocess.PIPE)
                return result.stdout.decode('utf-8').strip()
            
            print(get_username())
    
    result:
    nitsanavni
    
    
            It appears your name, or at least the username currently
            logged in on the system, is "nitsanavni".
    """
    verify(
        fm(chat("what is my name? you can look around using cli cmds"), 70),
        options=auto_inline_options(),
    )


def test_tdd():
    '''
    
        write a very simple function that adds two numbers
        use TDD
        work in tiny steps, each step in a separate message
        you will be given the result of each step after execution
        use python, pytest (it's already installed)
        each test should be in a separate file
        the production code should be in a separate file
        files should be super short
        all the code should be in a subfolder called './add_two_numbers'
        when running the tests, only run those under the './add_two_numbers' folder
        use a quiet mode for pytest
    
    
            First, let's create a simple test to check if our "add" function can correctly add two
            numbers. We'll start by creating a file named `test_add.py` in the `./add_two_numbers`
            folder. This file will contain our first test.
            
            ---
            import os
            
            # Create the directory if it doesn't exist
            os.makedirs('./add_two_numbers', exist_ok=True)
            
            # First test to verify adding two numbers
            test_code = """
            def test_add_two_numbers():
                assert add(1, 2) == 3
            """
            
            with open('./add_two_numbers/test_add.py', 'w') as file:
                file.write(test_code)
            
            print("Test file created.")
    
    result:
    Test file created.
    
    
            Now that we have our test file, let's run the test to see it fail. This is because we
            haven't implemented the `add` function yet, which is an essential part of the Test-Driven
            Development (TDD) process—writing a failing test first.
            
            ---
            import subprocess
            
            # Run pytest in the add_two_numbers directory
            result = subprocess.run(['pytest', './add_two_numbers/', '-q'], capture_output=True,
            text=True)
            
            print(result.stdout)
            print("Test run completed. Likely it has failed because the add function isn't defined
            yet.")
    
    result:
    F                                                                        [100%]
    =================================== FAILURES ===================================
    _____________________________ test_add_two_numbers _____________________________
    
        def test_add_two_numbers():
    >       assert add(1, 2) == 3
    E       NameError: name 'add' is not defined
    
    add_two_numbers/test_add.py:3: NameError
    =========================== short test summary info ============================
    FAILED add_two_numbers/test_add.py::test_add_two_numbers - NameError: name 'a...
    1 failed in 0.04s
    
    Test run completed. Likely it has failed because the add function isn't defined yet.
    
    
            As expected, the test failed because the `add` function is not defined. Let's proceed with
            the TDD process by implementing a simple `add` function that returns the sum of two numbers.
            
            We'll create a file named `add.py` in the `./add_two_numbers` folder to contain our
            function.
            
            ---
            import os
            
            # Implementation of the add function
            add_code = """
            def add(a, b):
                return a + b
            """
            
            with open('./add_two_numbers/add.py', 'w') as file:
                file.write(add_code)
            
            print("Add function implemented.")
    
    result:
    Add function implemented.
    
    
            Now that we have implemented the `add` function, we need to update our test file to import
            this function. Without the import, our test will still fail because it does not know where
            to find the `add` function.
            
            ---
            # Fix the test by importing the add function
            test_code_with_import = """
            from add import add
            
            def test_add_two_numbers():
                assert add(1, 2) == 3
            """
            
            with open('./add_two_numbers/test_add.py', 'w') as file:
                file.write(test_code_with_import)
            
            print("Test file updated with import statement.")
    
    result:
    Test file updated with import statement.
    
    
            With the test file updated to import the `add` function, let's run our test again. This
            time, it should pass since we've implemented the `add` function according to the test's
            expectation.
            
            ---
            import subprocess
            
            # Run pytest in the add_two_numbers directory again
            result = subprocess.run(['pytest', './add_two_numbers/', '-q'], capture_output=True,
            text=True)
            
            print(result.stdout)
            print("Test re-run completed.")
    
    result:
    .                                                                        [100%]
    1 passed in 0.01s
    
    Test re-run completed.
    
    
            Great! The test has passed, indicating that our `add` function is correctly implemented
            according to the initial test case. This is a fundamental example of the Test-Driven
            Development (TDD) process, where we:
            
            1. Wrote a test that failed because the functionality was not implemented.
            2. Implemented the minimal amount of code necessary to make the test pass.
            3. Verified that the test passed.
            
            If you have more functionalities to add or want to extend this example further, let me know!
    '''
    prompt = """
    write a very simple function that adds two numbers
    use TDD
    work in tiny steps, each step in a separate message
    you will be given the result of each step after execution
    use python, pytest (it's already installed)
    each test should be in a separate file
    the production code should be in a separate file
    files should be super short
    all the code should be in a subfolder called './add_two_numbers'
    when running the tests, only run those under the './add_two_numbers' folder
    use a quiet mode for pytest
    """
    verify(fm(chat(prompt), 100), options=auto_inline_options())
