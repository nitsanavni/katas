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

class MarkdownPlan:
    def __init__(self, markdown):
        self.markdown = markdown
    
    def get_next_todo(self) -> str:
        # impl me!
        pass


def test_get_next_todo():
    """
    None
    ***** DELETE ME TO APPROVE *****
    """
    markdown = """- [ ] first
- [ ] second
"""
    plan = MarkdownPlan(markdown)
    verify(plan.get_next_todo(), options=Options().inline(InlineOptions.semi_automatic()))