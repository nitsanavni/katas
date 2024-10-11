import yaml


def model_to_html(yaml_file, html_file):
    with open(yaml_file, 'r') as file:
        diffs = yaml.safe_load(file)

    with open(html_file, 'w') as file:
        file.write('<pre style="color: gray">\n')
        for line in diffs:
            if isinstance(line, str):
                file.write(f"{line}\n")
            elif isinstance(line, list):
                for change in line:
                    if isinstance(change, str):
                        file.write(f"{change}")
                    elif isinstance(change, dict):
                        if 'd' in change:
                            file.write(
                                f'<s style="color: red">{change["d"]}</s>')
                        if 'a' in change:
                            file.write(
                                f'<b style="color: green">{change["a"]}</b>')
                file.write('\n')
        file.write('</pre>\n')


if __name__ == "__main__":
    model_to_html('diff.yml', 'diff.html')
