from typing import List
from filecache import filecache
import openai


@filecache(1e9)
def chat(messages: List, sample=0):
    return (
        openai.chat.completions.create(model="gpt-4o", messages=messages)
        .choices[0]
        .message.content
    )

from approvaltests import verify, Options

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
        options=Options().inline()
    )