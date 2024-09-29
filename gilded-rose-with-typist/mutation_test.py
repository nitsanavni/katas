import os
import subprocess
import argparse
import re  # Import 're' for regular expressions
# Import the generate_mutations function
from generate_mutations import generate_mutations


def run_test(test_cmd):
    result = subprocess.run(test_cmd, shell=True,
                            executable='/bin/bash', stdout=subprocess.PIPE, stderr=subprocess.PIPE)  # Suppress output
    return result


def mutate_file(mutated_file_path, mutations, test_cmd):  # Include 'test_cmd' as a parameter
    original_file_path = f"{mutated_file_path}.bak"  # Backup file path
    # Make a copy of the original file
    os.system(f"cp {mutated_file_path} {original_file_path}")

    with open(mutated_file_path, 'r') as file:
        original_lines = file.readlines()  # Read original lines into memory
    surviving_mutations = []  # List to track surviving mutations

    # Run the test command before mutations
    test_result = run_test(test_cmd)
    if test_result.returncode != 0:
        print("Test command failed. Here's the output:")
        print(test_result.stdout.decode())
        print(test_result.stderr.decode())
        return  # Exit if the test command fails

    for line_number, pattern, replacement in mutations:
        # Create a copy of the lines to mutate
        mutated_lines = original_lines.copy()

        target_line = mutated_lines[line_number - 1]
        mutated_line = re.sub(pattern, replacement, target_line)

        mutated_lines[line_number - 1] = mutated_line

        # Write the mutated lines to the file
        with open(mutated_file_path, 'w') as file:
            file.writelines(mutated_lines)

        if run_test(test_cmd).returncode == 0:  # Check if 'test_cmd' passes
            # Log surviving mutation
            surviving_mutations.append((line_number, pattern, replacement))

    # Restore the original lines after all mutation attempts
    # Restore the original file
    os.system(f"cp {original_file_path} {mutated_file_path}")

    if surviving_mutations:
        print(f"Total surviving mutations: {len(surviving_mutations)}")
        for mutation in surviving_mutations:
            print(
                f"Surviving mutation details: Line {mutation[0]}, Pattern '{mutation[1]}', Replacement '{mutation[2]}'")
    else:
        print("All mutations were killed.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Run mutations and test on the mutated file.')
    parser.add_argument('--mutate_file', type=str,
                        required=True, help='File to mutate')
    parser.add_argument('--test_cmd', type=str, required=True,
                        help='Command to test the mutations')

    args = parser.parse_args()

    # Assign mutations from the function call
    mutations = generate_mutations(args.mutate_file)

    mutate_file(args.mutate_file, mutations,
                args.test_cmd)  # Pass 'args.test_cmd'
