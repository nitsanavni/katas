import subprocess
import os
import argparse
import re
from generate_mutations import generate_mutations


def run_test(test_cmd):
    result = subprocess.run(test_cmd, shell=True,
                            executable='/bin/bash', stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return result


def mutate_file(mutated_file_path, mutations, test_cmd):
    # Read the original file content
    with open(mutated_file_path, 'r') as file:
        original_lines = file.readlines()
        file.close()

    surviving_mutations = []

    # Run the test command before mutations
    test_result = run_test(test_cmd)
    if test_result.returncode != 0:
        print("Test command failed. Here's the output:")
        print(test_result.stdout.decode())
        print(test_result.stderr.decode())
        return  # Exit if the test command fails

    for line_number, pattern, replacement in mutations:
        print(line_number, pattern, replacement)
        # Create a copy of the lines to mutate
        mutated_lines = original_lines.copy()

        target_line = mutated_lines[line_number - 1]
        mutated_line = re.sub(pattern, replacement, target_line)

        mutated_lines[line_number - 1] = mutated_line

        # Write the mutated lines to the file
        with open(mutated_file_path, 'w') as file:
            file.writelines(mutated_lines)
            file.flush()
            file.close()

        if run_test(test_cmd).returncode == 0:
            surviving_mutations.append((line_number, pattern, replacement))

    # Restore the original file content
    with open(mutated_file_path, 'w') as file:
        file.writelines(original_lines.copy())
        file.flush()
        file.close()

    if surviving_mutations:
        print(
            f"Total surviving mutations: {len(surviving_mutations)}/{len(mutations)}")
        for mutation in surviving_mutations:
            print(
                f"Line {mutation[0]}, Pattern '{mutation[1]}', Replacement '{mutation[2]}'")
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

    mutations = generate_mutations(args.mutate_file)

    mutate_file(args.mutate_file, mutations, args.test_cmd)

    with open(args.mutate_file, 'r') as file:
        lines = file.readlines()
        file.close()

    with open(args.mutate_file, 'w') as file:
        file.writelines(lines)
        file.flush()
        file.close()

    os.system(f"cp {args.mutate_file} {args.mutate_file}.bak")
    os.system(f"cp {args.mutate_file}.bak {args.mutate_file}")
