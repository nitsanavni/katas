from filecache import filecache
import openai
import subprocess
import sys

from typing import List

from approvaltests import verify, Options


@filecache(1e9)
def chat(messages: List, sample=0):
    return (
        openai.chat.completions.create(model="gpt-4-turbo-preview", messages=messages)
        .choices[0]
        .message.content
    )


def test_chat():
    """
    Hello! How can I assist you today?
    """
    verify(
        chat(
            messages=[
                {"role": "user", "content": "Hello!"},
            ]
        ),
        options=Options().inline(),
    )


def give_me_a_message(letter: str):
    return {"role": "user", "content": f"Give me a {letter}!"}


def test_chat_give_me_a_message():
    """
    {'role': 'user', 'content': 'Give me a H!'}
    """
    verify(
        give_me_a_message("H"),
        options=Options().inline(),
    )


def format(messages: List):
    return "\n".join([message["content"] for message in messages])


def chant(letters: str):
    messages = []
    for letter in letters:
        messages.append(give_me_a_message(letter))
        response = chat(messages)
        messages.append({"role": "assistant", "content": response})
    messages.append({"role": "user", "content": "What did that spell?!"})
    messages.append({"role": "assistant", "content": chat(messages)})

    return format(messages)


def test_chant():
    """
    Give me a A!
    A!
    Give me a B!
    B!
    Give me a C!
    C!
    What did that spell?!
    That spelled "ABC"!
    """
    verify(
        chant("ABC"),
        options=Options().inline(),
    )


def main():
    print(chant(sys.argv[0]))


if __name__ == "__main__":
    main()


def test_chant_e2e():
    """
    Give me a c!
    C!
    Give me a h!
    H!
    Give me a a!
    A!
    Give me a n!
    N!
    Give me a t!
    T!
    Give me a .!
    !
    Give me a p!
    P!
    Give me a y!
    Y!
    What did that spell?!
    Chant!
    
    But it looks like there might have been a mix-up with a "." instead of another letter. If we were aiming for "chant," then that's correct without the period. If the intent was something else, like "chantpy," I followed your instructions literally, even with the unexpected "." So, it spelled "Chant."
    """
    verify(
        subprocess.run(
            ["python", "chant.py", "Hello"], capture_output=True
        ).stdout.decode(),
        options=Options().inline(),
    )
