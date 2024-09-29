import os
import subprocess
import argparse
import shutil
from generate_mutations import generate_mutations
import re  # Import 're' for regular expressions


def run_test(test_cmd):
    result = subprocess.run(test_cmd, shell=True,
                            executable='/bin/bash', stdout=subprocess.PIPE, stderr=subprocess.PIPE)  # Suppress output
    return result


def save_backup_file(file_path):
    temp_file_path = f"{file_path}.bak"
    shutil.copyfile(file_path, temp_file_path)
    return temp_file_path


def restore_original_file(backup_file_path, mutated_file_path):
    shutil.copyfile(backup_file_path, mutated_file_path)
    os.remove(backup_file_path)


def mutate_file(mutated_file_path, mutations, test_cmd):  # Include 'test_cmd' as a parameter
    backup_file_path = save_backup_file(
        mutated_file_path)  # Save original before mutation
    surviving_mutations = []  # List to track surviving mutations

    # Run the test command before mutations
    test_result = run_test(test_cmd)
    if test_result.returncode != 0:
        print("Test command failed. Here's the output:")
        print(test_result.stdout.decode())
        print(test_result.stderr.decode())
        restore_original_file(backup_file_path, mutated_file_path)
        return  # Exit if the test command fails

    for line_number, pattern, replacement in mutations:
        with open(mutated_file_path, 'r') as file:
            lines = file.readlines()

        target_line = lines[line_number - 1]
        mutated_line = re.sub(pattern, replacement, target_line)

        lines[line_number - 1] = mutated_line

        with open(mutated_file_path, 'w') as file:
            file.writelines(lines)

        if run_test(test_cmd).returncode == 0:  # Check if 'test_cmd' passes
            # Log surviving mutation
            surviving_mutations.append((line_number, pattern, replacement))

        # Restore the original line after testing using the backup file
        # Restore from backup
        shutil.copyfile(backup_file_path, mutated_file_path)

    # Restore the original file after all mutation attempts
    restore_original_file(backup_file_path, mutated_file_path)

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
