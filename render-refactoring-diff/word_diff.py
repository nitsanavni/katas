import sys
import difflib
import yaml


def get_word_diffs(file1_lines, file2_lines):
    # Tokenize lines into words and generate differences using difflib
    differ = difflib.Differ()
    diff = differ.compare(file1_lines, file2_lines)
    return list(diff)


def process_diffs(diffs):
    result = []
    for line in diffs:
        if line.startswith("  "):
            result.append(line[2:])  # unchanged parts
        else:
            parts = []
            current = line[2:]
            if line.startswith("- "):
                parts.append({'d': current})  # deleted parts
            elif line.startswith("+ "):
                parts.append({'a': current})  # added parts
            if parts:
                result.append(parts)
    return result


def line_diff_yaml(file1_lines, file2_lines):
    diffs = []
    for line1, line2 in zip(file1_lines, file2_lines):
        if line1 == line2:
            diffs.append(line1.rstrip('\n'))
        else:
            s = difflib.SequenceMatcher(None, line1, line2)
            line_result = []
            for tag, i1, i2, j1, j2 in s.get_opcodes():
                if tag == 'equal':
                    line_result.append(line1[i1:i2])
                elif tag == 'replace':
                    line_result.append({'d': line1[i1:i2]})
                    line_result.append({'a': line2[j1:j2]})
                elif tag == 'delete':
                    line_result.append({'d': line1[i1:i2]})
                elif tag == 'insert':
                    line_result.append({'a': line2[j1:j2]})
            diffs.append(line_result)
    return diffs


def main():
    if len(sys.argv) != 3:
        print("Usage: python word_diff.py file1.txt file2.txt")
        sys.exit(1)

    file1_path, file2_path = sys.argv[1], sys.argv[2]

    with open(file1_path, 'r') as file1, open(file2_path, 'r') as file2:
        file1_lines = file1.readlines()
        file2_lines = file2.readlines()

    # Use the updated function to get the diffs
    word_diffs = line_diff_yaml(file1_lines, file2_lines)

    yaml_output = yaml.dump(word_diffs, allow_unicode=True,
                            default_flow_style=False, sort_keys=False)
    print(yaml_output)


if __name__ == "__main__":
    main()
