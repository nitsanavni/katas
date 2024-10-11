import sys
import yaml


def convert_diff_to_yaml(diff_input):
    diff_input = diff_input.strip()
    yaml_output = []

    for line in diff_input.splitlines():
        parts = []
        cursor = 0

        while cursor < len(line):
            if line[cursor:cursor+2] == '[-':
                # Start of a deletion
                end = line.find('-]', cursor)
                deleted_text = line[cursor+2:end]
                parts.append({'d': deleted_text})
                cursor = end + 2
            elif line[cursor:cursor+2] == '{+':
                # Start of an addition
                end = line.find('+}', cursor)
                added_text = line[cursor+2:end]
                parts.append({'a': added_text})
                cursor = end + 2
            else:
                # Regular text
                next_del = line.find('[-', cursor)
                next_add = line.find('{+', cursor)
                filtered_indices = list(
                    filter(lambda x: x != -1, [next_del, next_add]))
                next_change = min(
                    filtered_indices) if filtered_indices else len(line)
                if cursor < next_change:
                    parts.append(line[cursor:next_change])
                cursor = next_change

        if len(parts) == 1 and isinstance(parts[0], str):
            # It's a regular line
            yaml_output.append(parts[0])
        else:
            # It's a line with changes detected
            yaml_output.append(parts)

    return yaml.dump(yaml_output, default_flow_style=False)


def main():
    # Read the input from stdin
    diff_input = sys.stdin.read()
    yaml_output = convert_diff_to_yaml(diff_input)
    print(yaml_output)


if __name__ == "__main__":
    main()
