# generate_mutations.py
import sys
import re


def generate_mutations(file_path):
    mutations = []

    with open(file_path, 'r') as file:
        for line_number, line in enumerate(file.readlines(), start=1):
            # Looking for integers in the line
            for match in re.findall(r'\d+', line):
                pattern = match  # The integer found
                replacement = "replacement_value"  # Placeholder for the replacement string
                mutation = (line_number, pattern, replacement)
                mutations.append(mutation)

    for mutation in mutations:
        print(mutation[0], mutation[1], mutation[2])


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 generate_mutations.py <file>")
    else:
        generate_mutations(sys.argv[1])
