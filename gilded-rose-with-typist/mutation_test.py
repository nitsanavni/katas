import os
import subprocess
import argparse
import shutil
from generate_mutations import generate_mutations
import re  # Import 're' for regular expressions


def run_test(test_cmd):
    result = subprocess.run(test_cmd, shell=True,
                            executable='/bin/bash', stdout=subprocess.PIPE, stderr=subprocess.PIPE)  # Suppress output
    return result.returncode == 0


def save_original_file(file_path):
    temp_file_path = f"{file_path}.bak"
    shutil.copyfile(file_path, temp_file_path)
    return temp_file_path


def restore_original_file(original_file_path, mutate_file_path):
    shutil.copyfile(original_file_path, mutate_file_path)
    os.remove(original_file_path)


def mutate_file(file_path, mutations, test_cmd):  # Include 'test_cmd' as a parameter
    original_file_path = save_original_file(
        file_path)  # Save original before mutation
    surviving_mutations = []  # List to track surviving mutations

    for line_number, pattern, replacement in mutations:
        with open(file_path, 'r') as file:
            lines = file.readlines()

        target_line = lines[line_number - 1]
        mutated_line = re.sub(pattern, replacement, target_line)

        lines[line_number - 1] = mutated_line

        with open(file_path, 'w') as file:
            file.writelines(lines)

        if run_test(test_cmd):  # Check if 'test_cmd' passes
            # Log surviving mutation
            surviving_mutations.append((line_number, pattern, replacement))
            print(
                f"Surviving mutation: Replace '{pattern}' with '{replacement}' on line {line_number}")

    # Restore the original file after all mutation attempts
    restore_original_file(original_file_path, file_path)

    if surviving_mutations:
        print(f"Total surviving mutations: {len(surviving_mutations)}")
        for mutation in surviving_mutations:
            print(
                f"Surviving mutation details: Line {mutation[0]}, Pattern '{mutation[1]}', Replacement '{mutation[2]}'")
    else:
        print("All mutations were killed.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Run mutations and test on the mutate file.')
    parser.add_argument('--mutate_file', type=str,
                        required=True, help='File to mutate')
    parser.add_argument('--test_cmd', type=str, required=True,
                        help='Command to test the mutations')

    args = parser.parse_args()

    # Assign mutations from the function call
    mutations = generate_mutations(args.mutate_file)

    mutate_file(args.mutate_file, mutations,
                args.test_cmd)  # Pass 'args.test_cmd'
