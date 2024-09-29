import sys
import re


def replace_int_with_zero(line):
    mutations = []
    # Looking for integers in the line
    for match in re.findall(r'\d+', line):
        pattern = match  # The integer found
        # replace int with 0
        replacement = "0"  # Placeholder for the mutation string
        mutation = (pattern, replacement)
        mutations.append(mutation)
    return mutations


def generate_mutations(file_path):
    all_mutations = []

    with open(file_path, 'r') as file:
        for line_number, line in enumerate(file.readlines(), start=1):
            mutations = replace_int_with_zero(line)
            for mutation in mutations:
                all_mutations.append((line_number, mutation[0], mutation[1]))

    return all_mutations  # Return the mutations instead of printing them


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 generate_mutations.py <file>")
    else:
        mutations = generate_mutations(sys.argv[1])
        for mutation in mutations:
            print(mutation[0], mutation[1], mutation[2])
