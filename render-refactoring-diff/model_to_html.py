import yaml
import sys


def model_to_html():
    # Read YAML content from standard input
    diffs = yaml.safe_load(sys.stdin)

    # Write HTML content to standard output
    sys.stdout.write('<pre style="color: gray">\n')
    for line in diffs:
        if isinstance(line, str):
            sys.stdout.write(f"{line}\n")
        elif isinstance(line, list):
            for change in line:
                if isinstance(change, str):
                    sys.stdout.write(f"{change}")
                elif isinstance(change, dict):
                    if 'd' in change:
                        sys.stdout.write(
                            f'<s style="color: red">{change["d"]}</s>')
                    if 'a' in change:
                        sys.stdout.write(
                            f'<b style="color: green">{change["a"]}</b>')
            sys.stdout.write('\n')
    sys.stdout.write('</pre>\n')


if __name__ == "__main__":
    model_to_html()
