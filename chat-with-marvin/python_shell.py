import pexpect


def foo():
    return 9


foo()


class PythonShell:
    def __init__(self):
        self.child = pexpect.spawn("python")
        self.child.expect_exact(">>> ")

    def send(self, code: str) -> str:
        self.child.sendline(code)
        index = self.child.expect([pexpect.TIMEOUT, ">>> "])
        if index == 0:
            raise Exception("Timeout or unexpected output from Python shell")

        return self.child.before.decode()

    def close(self):
        self.child.close()


if __name__ == "__main__":
    shell = PythonShell()
    print(
        shell.send(
            """result = 4 - 5
result"""
        )
    )
    print(shell.send("1"))
    print(shell.send("a=2"))
    print(shell.send("a"))
    print(shell.send("a"))
    print(shell.send("print('Hello, world!')"))
    print(
        shell.send(
            """def foo(a,b):
    print('bar')
    print(a+b)  # this is a comment
"""
        )
    )
    print(shell.send("print('Hello, world!')"))
    print(shell.send("foo(1,2)"))
    print(shell.send("foo(1,2)"))
    print(shell.send("foo(1,2)"))
    print(shell.send("print('Hello, world!')"))
    shell.close()
