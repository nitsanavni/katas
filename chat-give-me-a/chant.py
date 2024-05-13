from filecache import filecache
import openai
import subprocess
import sys
from functools import reduce

from typing import List, Dict

from approvaltests import verify as v, Options

verify = lambda x: v(x, options=Options().inline())


@filecache(1e9)
def chat(messages: List, sample=0):
    return (
        openai.chat.completions.create(model="gpt-4o", messages=messages)
        .choices[0]
        .message.content
    )


def test_chat():
    """
    Hi there! How can I assist you today?
    """
    verify(
        chat(
            messages=[
                {"role": "user", "content": "Hello!"},
            ]
        ),
    )


def give_me_a_message(letter: str):
    return {"role": "user", "content": f"Give me a {letter}!"}


def test_chat_give_me_a_message():
    """
    {'role': 'user', 'content': 'Give me a H!'}
    """
    verify(give_me_a_message("H"))


def format(messages: List):
    return "\n".join([message["content"] for message in messages])


# https://chat.openai.com/share/5a6f3e66-d54c-40d2-a945-10da9eba1580
def chat_multi(user_messages: List[str]) -> List[Dict]:
    return reduce(
        lambda acc, user_message: acc
        + [
            {"role": "user", "content": user_message},
            {
                "role": "assistant",
                "content": chat(acc + [{"role": "user", "content": user_message}]),
            },
        ],
        user_messages,
        [],
    )


def test_chat_multi():
    """
    Hello!
    Hello! How can I assist you today?
    How are you?
    I'm just a computer program, so I don't have feelings, but thanks for asking! How can I help you today?
    """
    verify(
        format(
            chat_multi(
                user_messages=[
                    "Hello!",
                    "How are you?",
                ]
            )
        )
    )


def chant(letters: str):
    return format(
        chat_multi(
            user_messages=["Let's chant, are you ready?"]+[f"Give me a {letter}!" for letter in letters]
            + ["What did that spell?!"]
        )
    )


def test_chant():
    """
    Let's chant, are you ready?
    Absolutely! Let's chant together! What kind of chant would you like to do?
    Give me a A!
    A!
    Give me a B!
    B!
    Give me a C!
    C!
    What did that spell?!
    ABC! 🎉 Great job!
    """
    verify(chant("ABC"))


def main():
    print(chant(sys.argv[1]))


if __name__ == "__main__":
    main()


def run_this_process(param: str):
    return subprocess.run(
        ["python", "chant.py", param], capture_output=True
    ).stdout.decode()


def test_chant_e2e():
    """
    Let's chant, are you ready?
    Absolutely! Let's chant together! What kind of chant would you like to do?
    Give me a H!
    H!
    Give me a e!
    E!
    Give me a l!
    L!
    Give me a l!
    L!
    Give me a o!
    O!
    What did that spell?!
    HELLO! 🎉
    """
    verify(run_this_process("Hello"))
