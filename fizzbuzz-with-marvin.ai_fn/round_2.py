#!/usr/bin/env python

import marvin
from pydantic import BaseModel


# marvin.settings.llm_model = "openai/gpt-3.5-turbo-1106"
marvin.settings.llm_model = "openai/gpt-4-1106-preview"
marvin.settings.llm_temperature = 0


@marvin.ai_fn
def write_python_code_that(intention: str) -> str:
    """
    write python code that fulfills the 'intention'
    """


class PythonFunctionSourceCode(BaseModel):
    # pass
    function_name: str
    complete_source_code: str

    def __str__(self):
        return self.complete_source_code


@marvin.ai_fn
def implement_python_function(function_name: str, doc_string: str = None) -> str:
    """
    implement a valid python code snippet that defines a python function
    use type hints
    """


def insert_to_current_file(string_to_insert: str) -> None:
    """
    inserts a string to the current python source file before the line if __name__ == '__main__':
    """
    with open(__file__, "r+") as file:
        content = file.readlines()
        insert_index = content.index('if __name__ == "__main__":\n')
        content.insert(insert_index, string_to_insert + "\n")
        file.seek(0)
        file.writelines(content)


def add(a: int, b: int) -> int:
    """
    adds two numbers
    """
    return a + b


if __name__ == "__main__":
    insert_to_current_file((implement_python_function("add", "adds two numbers")))
