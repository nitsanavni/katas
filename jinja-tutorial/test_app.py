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


class App:
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
    return App(page)


def test_rendering(app: App):
    """
                                Welcome! It's Wednesday
    
       Hello from index.html
       (BUTTON) get time
    """
    app.verify()

def test_click(app: App):
    """
                                Welcome! It's Wednesday
    
       Hello from index.html
       (BUTTON) get time
    
       Time: 15:59:24____________
    """
    app.click_get_time()

    app.verify()
