from playwright.sync_api import Page
import subprocess

from approvaltests import verify, Options
from approvaltests.reporters.reporter_that_automatically_approves import (
    ReporterThatAutomaticallyApproves as Auto,
)

import pytest

def render(page: Page):
    out = (subprocess.check_output(["lynx", "-dump", "-stdin"], input=page.content().encode("utf-8")))
    return out.decode("utf-8")

def verify_page(page: Page):
    verify(render(page), options=Options().with_reporter(Auto()).inline())


class AppDriver:
    def __init__(self, page: Page):
        self.page = page
        self.goto("http://127.0.0.1:5000/")

    def goto(self, url):
        self.page.goto(url)

    def click(self, text):
        self.page.click(text)
    
    def click_get_time(self):
        self.click("text=get time")
    
    def verify(self):
        verify_page(self.page)

@pytest.fixture
def app(page):
    return AppDriver(page)


def test_rendering(app: AppDriver):
    """
                                Welcome! It's Wednesday
    
       Hello from index.html
       (BUTTON) get time
    """
    app.verify()

def test_click(app: AppDriver):
    """
                                Welcome! It's Wednesday
    
       Hello from index.html
       (BUTTON) get time
    
       Time: 22:20:36____________
    """
    app.click_get_time()

    app.verify()


import openai
from filecache import filecache
from typing import List

@filecache(1e9)
def chat(messages: List, sample=0):
    return (
        openai.chat.completions.create(model="gpt-4-turbo-preview", messages=messages)
        .choices[0]
        .message.content
    )

def strip_code_blocks(text):
    return "\n".join([line for line in text.splitlines() if not line.startswith("```")])

def test_chat_controls_page(page):
    """
    respond with either the word "stop" together with your summary or
    with python playwright code (!no extra characters!) assuming there's already a 'page' object (e.g. page.goto('...'))
    after each response you will be given the lynx browser redering of the page
    
    task: explore the app in 127.0.0.1:5000
    
    ```python
    page.goto('http://127.0.0.1:5000')
    ```
                                Welcome! It's Wednesday
    
       Hello from index.html
       (BUTTON) get time
    
    ```python
    page.click('text=get time')
    ```
                                Welcome! It's Wednesday
    
       Hello from index.html
       (BUTTON) get time
    
       Time: 22:20:37____________
    
    stop
    I explored the app at 127.0.0.1:5000, accessing the main page which displayed a welcome message, the text "Hello from index.html", and a button labeled "get time". Upon clicking the "get time" button, the page presented the current time as "22:20:37".
    """
    messages = [{"role": "user", "content": """respond with either the word "stop" together with your summary or
with python playwright code (!no extra characters!) assuming there's already a 'page' object (e.g. page.goto('...'))
after each response you will be given the lynx browser redering of the page

task: explore the app in 127.0.0.1:5000
"""}]
    
    response = ""
    while not "stop" in response:
        response = chat(messages)
        print(response)
        messages.append({"role": "assistant", "content": response})
        if "stop" in response:
            break
        eval(strip_code_blocks(response))
        messages.append({"role": "user", "content": render(page)})
    
    verify("\n".join([m["content"] for m in messages]), options=Options().inline())
    
    