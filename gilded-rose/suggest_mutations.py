import argparse

from find_mutations_in_line import find_mutations


def parsearg_filepath():
    parser = argparse.ArgumentParser(
        description="Process a Python file for mutation suggestions."
    )
    parser.add_argument(
        "filepath", type=str, help="The path to the Python file"
    )
    args = parser.parse_args()
    return args.filepath


def read_lines(file):
    with open(file) as f:
        return f.readlines()


def main():
    file = parsearg_filepath()
    lines = read_lines(file)
    mutations = [
        (line_number, description, vi_cmd)
        for line_number, line in enumerate(lines, start=1)
        for description, vi_cmd in find_mutations(line)
    ]
    print(
        "\n---\n".join(
            [
                f"{line_number}\n{description}\n{vi_cmd}"
                for (line_number, description, vi_cmd) in mutations
            ]
        )
    )


if __name__ == "__main__":
    main()
