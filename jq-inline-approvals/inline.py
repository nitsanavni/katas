#!/usr/bin/env python3

import sys
import re
import subprocess
import textwrap


def inline_test_output_and_code(filename):
    tmp = open(filename)
    source = tmp.read()
    tmp.close()
    test_function_definition_pattern = re.compile(r"def (test_[^:]+)")
    comment_pattern = re.compile(r"# .+")
    with open(filename, 'r') as file:
        test_output = False
        for line in file:
            if test_output:
                if not comment_pattern.search(line):
                    test_output = False
                    print(line.rstrip())
            else:
                print(line.rstrip())

            match = test_function_definition_pattern.search(line)
            is_test_definition = match
            if is_test_definition:
                test = match.group(1)
                print(textwrap.indent((subprocess.run(
                    ["jaq", "-nr", source + test], capture_output=True, text=True).stdout), '# '))
                test_output = True


if __name__ == '__main__':
    source_filename = sys.argv[1]
    inline_test_output_and_code(source_filename)
