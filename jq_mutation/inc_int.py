import sys
import re


def increment_integer_in_line_and_print_file(file_path, line_number):
    try:
        with open(file_path, "r") as file:
            lines = file.readlines()
    except FileNotFoundError:
        return "File not found."

    # Check if the line number is within the range of the file
    if line_number < 1 or line_number > len(lines):
        return "Line number out of range."

    # Increment the integer in the specified line
    line = lines[line_number - 1]  # Adjusting for zero-based index
    match = re.search(r"\d+", line)

    if not match:
        return "No integer found in the specified line."

    # Incrementing the found integer
    old_number = match.group()
    incremented_number = str(int(old_number) + 1)
    new_line = line.replace(old_number, incremented_number, 1)
    lines[line_number - 1] = new_line

    # Print the entire file content with the updated line
    return "".join(lines)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py [file_path] [line_number]")
        sys.exit(1)

    file_path = sys.argv[1]
    line_number = int(sys.argv[2])

    result = increment_integer_in_line_and_print_file(file_path, line_number)
    print(result)
