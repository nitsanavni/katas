import os
import sys


class LogUpdate:
    def __init__(self, show_cursor=False):
        self.show_cursor = show_cursor
        self.previous_line_count = 0

    def _get_terminal_size(self):
        rows, columns = os.popen("stty size", "r").read().split()
        return int(rows), int(columns)

    def _erase_lines(self, count):
        for _ in range(count):
            sys.stdout.write("\x1b[2K")  # Clear the current line.
            sys.stdout.write("\x1b[1A")  # Move up a line.
        sys.stdout.write("\x1b[2K")  # Clear the last line.

    def render(self, *args):
        if not self.show_cursor:
            sys.stdout.write("\x1b[?25l")  # Hide the cursor.

        output = "\n".join(args)
        rows, columns = self._get_terminal_size()
        wrapped_output = (
            output  # In real use, you might want to wrap or truncate the output to fit.
        )

        if self.previous_line_count > 0:
            self._erase_lines(self.previous_line_count)

        sys.stdout.write(wrapped_output + "\n")
        sys.stdout.flush()

        self.previous_line_count = len(wrapped_output.split("\n"))

    def clear(self):
        if self.previous_line_count > 0:
            self._erase_lines(self.previous_line_count)
            self.previous_line_count = 0

    def done(self):
        self.clear()
        if not self.show_cursor:
            sys.stdout.write("\x1b[?25h")  # Show the cursor.


def example():
    import time

    log_update = LogUpdate()

    for i in range(5):
        log_update.render(f"Frame {i}", "----", f"{i} {i+1} {i+2} {i+3}", "----")
        time.sleep(1)

    log_update.done()


if __name__ == "__main__":
    example()
