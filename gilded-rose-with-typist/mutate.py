import sys
import re
import argparse


def mutate_file(file_path, line_number, pattern, replacement):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    if line_number < 1 or line_number > len(lines):
        print("Error: Line number is out of range.")
        return

    target_line = lines[line_number - 1]
    mutated_line = re.sub(pattern, replacement, target_line)

    lines[line_number - 1] = mutated_line

    # Print all lines to stdout instead of writing back to the file
    print(''.join(lines))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Mutate a line in a file.')
    parser.add_argument('--file', type=str, required=True,
                        help='Path to the file to mutate')
    parser.add_argument('--line', type=int, required=True,
                        help='Line number to mutate')
    parser.add_argument('--pattern', type=str, required=True,
                        help='Pattern to search for in the line')
    parser.add_argument('--replacement', type=str, required=True,
                        help='Replacement string for the match')

    args = parser.parse_args()
    mutate_file(args.file, args.line, args.pattern, args.replacement)
