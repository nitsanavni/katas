import sys


def convert_diff_to_html(diff_input):
    diff_input = diff_input.strip()
    html_output = ['<pre style="color: gray">']

    for line in diff_input.splitlines():
        converted_line = line
        # Handle deletions marked by [- -]
        converted_line = converted_line.replace(
            '[-', '<s style="color: red">').replace('-]', '</s>')
        # Handle additions marked by {+ +}
        converted_line = converted_line.replace(
            '{+', '<b style="color: green">').replace('+}', '</b>')
        html_output.append(converted_line)

    html_output.append('</pre>')
    return '\n'.join(html_output)


def main():
    # Read the input from stdin
    diff_input = sys.stdin.read()
    html_output = convert_diff_to_html(diff_input)
    print(html_output)


if __name__ == "__main__":
    main()
