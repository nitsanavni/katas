def mutate(src: str, line_number: number, change_to: str) -> str:
    return "\n".join([line if n is not line_number else change_to for line in src.split("\n")])

def main():
    src = get_stdin()
    line_number, change_to = parse_args()
    print(mutate(src, line_number, change_to))


if __name__ == "__main__":
    main()
