#!/usr/bin/env python3

import sys
import re
import subprocess
import textwrap


def read_file(filename):
    tmp = open(filename, 'r')
    jq = tmp.read()
    tmp.close()
    pattern = re.compile(r"def (test_[^:]+)")
    comment = re.compile(r"# .+")
    with open(filename, 'r') as file:
        test_output = False
        for line in file:
            if test_output:
                if not comment.search(line):
                    test_output = False
                    print(line.rstrip())
            else:
                print(line.rstrip())
            match = pattern.search(line)
            if match:
                test = match.group(1)
                print(textwrap.indent(subprocess.getoutput(
                    f'jaq -nr "$(cat {filename})"{test}'), '# '))
                test_output = True


if __name__ == '__main__':
    filename = sys.argv[1]
    read_file(filename)
