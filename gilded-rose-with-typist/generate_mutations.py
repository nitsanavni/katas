# mutations.py
import sys
import re


def generate_mutations(file_path):
    mutations = []

    with open(file_path, 'r') as file:
        for line_number, line in enumerate(file.readlines(), start=1):
            # Looking for integers in the line
            if re.search(r'\d+', line):
                mutation = (line.strip(), "0")
                mutations.append((line_number, mutation))

    for mutation in mutations:
        print(mutation[0], mutation[1])


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 mutations.py <file>")
    else:
        generate_mutations(sys.argv[1])
