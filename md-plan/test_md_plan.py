# the one at the top is the current - the first non-done item from the top
# when top level item is done - move it to the bottom
# when nested item is done don't move it
# use `- [ ]` for not done items and `- [x]` for done items
# `- ~~[ ] <content>~~` - cancelled item
# api
# plan.todo('item', for='parent pattern')
# add parser, and examples, prompt
# the way to id an item is by its content / a pattern that matches it

from approvaltests import verify, Options
from approvaltests.inline.inline_options import InlineOptions

import re


class MarkdownPlan:
    def __init__(self, markdown):
        self.markdown = markdown
        self.items = self.parse_markdown(markdown)

    def parse_markdown(self, markdown):
        items = []
        lines = markdown.split("\n")
        for line in lines:
            if re.match(r"^- \[ \] ", line):  # Matches non-done top-level items
                items.append((line, "todo"))
            elif re.match(r"^- \[x\] ", line):  # Matches done items
                items.append((line, "done"))
            elif re.match(r"^- ~~\[ \] ", line):  # Matches cancelled items
                items.append((line, "cancelled"))
        return items

    def get_next_todo(self) -> str:
        for item, status in self.items:
            if status == "todo":
                return item.strip()
        return None


def test_get_next_todo():
    """
    - [ ] first
    """
    markdown = """- [ ] first
- [ ] second
"""
    plan = MarkdownPlan(markdown)
    verify(
        plan.get_next_todo(), options=Options().inline(InlineOptions.semi_automatic())
    )
