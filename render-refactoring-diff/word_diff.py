import difflib
import sys
import yaml


def generate_word_diff(file1, file2):
    # Read the files
    with open(file1, 'r') as f1, open(file2, 'r') as f2:
        lines1 = f1.readlines()
        lines2 = f2.readlines()

    # A list to store the diff result
    diff_result = []

    # Create a differ object
    d = difflib.Differ()

    # Iterate over line pairs from both files
    for line1, line2 in zip(lines1, lines2):
        words1 = line1.split()
        words2 = line2.split()

        # Generate differences using the differ object
        line_diff = list(d.compare(words1, words2))
        diff_line = []

        # Process each word/part in the line_diff
        for part in line_diff:
            code = part[0]
            word = part[2:]

            if code == ' ':
                # Unchanged word
                diff_line.append(word + ' ')
            elif code == '-':
                # Deleted word
                diff_line.append({'d': word})
            elif code == '+':
                # Added word
                diff_line.append({'a': word})

        # Remove the trailing space for the last unchanged word
        if diff_line and isinstance(diff_line[-1], str):
            diff_line[-1] = diff_line[-1].rstrip()

        # Append the diff line to the result
        diff_result.append(diff_line)

    # Handle case when file2 has more lines than file1
    for remaining_line in lines2[len(lines1):]:
        diff_result.append([{'a': remaining_line.rstrip()}])

    # Handle case when file1 has more lines than file2
    for remaining_line in lines1[len(lines2):]:
        diff_result.append([{'d': remaining_line.rstrip()}])

    # Print the diff result as a YAML document
    print(yaml.dump(diff_result, default_flow_style=False))


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python word_diff.py <file1> <file2>")
        sys.exit(1)

    file1, file2 = sys.argv[1], sys.argv[2]
    generate_word_diff(file1, file2)
