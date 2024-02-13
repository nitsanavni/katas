import time
from pathlib import Path
import subprocess
from split_code import SplitCode


def verified(func):
    def input(line):
        return line.split(" -> ")[0].strip()

    def format(line):
        i = input(line)
        if i:
            # the function itself is the transformer
            return f"{i} -> {func(i)}"
        else:
            return line

    func.get_docstring = lambda: func.__doc__
    func.get_path = lambda: func.__code__.co_filename
    func.get_own_name = lambda: func.__name__
    func.get_full_file_code = lambda: open(func.get_path()).read()
    func.inputs = lambda: [
        input(l) for l in func.get_docstring().splitlines() if l.strip()
    ]
    func.reformat_docstring = lambda: "\n".join(
        [format(l) for l in func.get_docstring().splitlines()][1:-1]
    )

    def swap():
        split_code = SplitCode.on_method(func.get_full_file_code(), func.get_own_name())
        return f'{split_code.before_method}\n{split_code.tab}"""\n{split_code.indent(func.reformat_docstring())}\n{split_code.tab}"""\n{split_code.after_method}'

    def write_received():
        filename = func.get_path().split("/")[-1]
        current_millis = str(int(round(time.time() * 1000)))
        file = Path(func.get_path()).with_name(
            filename + "." + func.get_own_name() + "." + current_millis + ".received.py"
        )
        Path(file).write_text(swap())
        return file

    def diff_tool():
        file = write_received()
        subprocess.run(["code", "-d", file, func.get_path()])

    def verify():
        reformat_stripped = "\n".join(
            [l.strip() for l in func.reformat_docstring().splitlines()]
        )
        docstring_stripped = "\n".join(
            [l.strip() for l in func.get_docstring().splitlines()][1:-1]
        )

        if reformat_stripped != docstring_stripped:
            diff_tool()
            msg = (
                "The docstring is not formatted correctly\n"
                + reformat_stripped
                + "\n"
                + docstring_stripped
            )
            raise AssertionError(msg)

    func.verify = verify

    def assert_same_docstring():
        assert func.get_docstring() == func.reformat_docstring()

    func.assert_same_docstring = assert_same_docstring

    return func
