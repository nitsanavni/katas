import os
import subprocess
import argparse
import shutil
import tempfile
from generate_mutations import generate_mutations


def run_test(test_cmd):
    result = subprocess.run(test_cmd, shell=True)
    return result.returncode == 0


def save_original_file(file_path):
    temp_file_path = f"{file_path}.bak"
    shutil.copyfile(file_path, temp_file_path)
    return temp_file_path


def restore_original_file(original_file_path, mutate_file_path):
    shutil.copyfile(original_file_path, mutate_file_path)
    os.remove(original_file_path)


def mutate_file(file_path, mutations):
    for line_number, pattern, replacement in mutations:
        with open(file_path, 'r') as file:
            lines = file.readlines()

        target_line = lines[line_number - 1]
        mutated_line = re.sub(pattern, replacement, target_line)

        lines[line_number - 1] = mutated_line

        with open(file_path, 'w') as file:
            file.writelines(lines)

        if not run_test(test_cmd):
            print(
                f"Mutation failed: Replace '{pattern}' with '{replacement}' on line {line_number}")

        restore_original_file(original_file_path, file_path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Run mutations and test on the mutate file.')
    parser.add_argument('--mutate_file', type=str,
                        required=True, help='File to mutate')
    parser.add_argument('--test_cmd', type=str, required=True,
                        help='Command to test the mutations')

    args = parser.parse_args()

    original_file_path = save_original_file(args.mutate_file)

    mutations = []
    generate_mutations(args.mutate_file)

    mutate_file(args.mutate_file, mutations)

    restore_original_file(original_file_path, args.mutate_file)
