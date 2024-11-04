import sys
import argparse


def get_stdin() -> str:
    return sys.stdin.read()


def parse_args():
    parser = argparse.ArgumentParser(description="Process some arguments.")
    parser.add_argument(
        "--line_number",
        "--line-number",
        type=int,
        help="Line number to change",
    )
    parser.add_argument(
        "--change_to", "--change-to", type=str, help="New content for the line"
    )
    args = parser.parse_args()
    return args.line_number, args.change_to


def mutate(src: str, line_number: int, change_to: str) -> str:
    return "\n".join(
        [
            line if i + 1 != line_number else change_to
            for i, line in enumerate(src.split("\n"))
        ]
    )


def main():
    src = get_stdin()
    line_number, change_to = parse_args()
    print(mutate(src, line_number, change_to))


if __name__ == "__main__":
    main()
