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


@filecache(seconds_of_validity=200)
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
