def is_comment(line):
    return line.strip().startswith("#")


def find_mutations(line):
    if is_comment(line):
        return []
    return [("description", "new line")]
