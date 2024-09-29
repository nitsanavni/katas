import sys
import re


def replace_int_with_zero(line):
    mutations = []
    for match in re.findall(r'\d+', line):
        pattern = match
        if pattern != '0':
            replacement = "0"
            mutation = (pattern, replacement)
            mutations.append(mutation)
    return mutations


def increment_int(line):
    mutations = []
    for match in re.findall(r'\d+', line):
        pattern = match
        incremented_value = str(int(pattern) + 1)
        mutation = (pattern, incremented_value)
        mutations.append(mutation)
    return mutations


def decrement_int(line):
    mutations = []
    for match in re.findall(r'\d+', line):
        pattern = match
        decremented_value = str(int(pattern) - 1)
        mutation = (pattern, decremented_value)
        mutations.append(mutation)
    return mutations


def mutate_if_statement(line, condition):
    mutations = []
    matches = re.findall(r'if (.+?):', line)
    for match in matches:
        mutation = f'if {condition}:'
        mutations.append((match, mutation))
    return mutations


def generate_mutations(file_path):
    all_mutations = []

    with open(file_path, 'r') as file:
        for line_number, line in enumerate(file.readlines(), start=1):
            mutations_zero = replace_int_with_zero(line)
            mutations_increment = increment_int(line)
            mutations_decrement = decrement_int(line)

            mutations_if_not = mutate_if_statement(
                line, 'not ' + re.findall(r'if (.+?):', line)[0] if re.findall(r'if (.+?):', line) else '')
            mutations_if_true = mutate_if_statement(line, 'True')
            mutations_if_false = mutate_if_statement(line, 'False')

            for mutation in mutations_zero:
                all_mutations.append((line_number, mutation[0], mutation[1]))
            for mutation in mutations_increment:
                all_mutations.append((line_number, mutation[0], mutation[1]))
            for mutation in mutations_decrement:
                all_mutations.append((line_number, mutation[0], mutation[1]))
            for mutation in mutations_if_not:
                all_mutations.append((line_number, mutation[0], mutation[1]))
            for mutation in mutations_if_true:
                all_mutations.append((line_number, mutation[0], mutation[1]))
            for mutation in mutations_if_false:
                all_mutations.append((line_number, mutation[0], mutation[1]))

    return all_mutations


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 generate_mutations.py <file>")
    else:
        mutations = generate_mutations(sys.argv[1])
        for mutation in mutations:
            print(mutation[0], mutation[1], mutation[2])
