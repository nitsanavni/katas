#!/usr/bin/env python3

import pexpect


def main():
    process = pexpect.spawn("vsce", ["package"])
    process.expect("continue")
    process.sendline("y")
    process.expect("continue")
    process.sendline("y")
    process.expect(pexpect.EOF)
    print("done 👍")


if __name__ == "__main__":
    main()
