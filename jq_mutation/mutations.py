import re
import sys


def generate_sed_commands(file_path):
    regex_sed_commands = [
        (r"\!=\s*\"[^\"]*\"", "s/!=/==/"),
        (r"\==\s*\"[^\"]*\"", "s/==/!=/"),
        (r"\>\s*\d+", "s/> />= /"),
        (r"\<\s*\d+", "s/< /<= /"),
        (r"if .* then", "s/if .* then/if true then/"),
        (r"if .* then", "s/if .* then/if false then/"),
        (r"\+", r"s/\+/\-/"),
        (r"-", r"s/\-/\+/"),
        (r"else\s*$", r"s/else/elif false then/"),
        (r"\b\d+\b", r"inc int"),
    ]

    sed_commands = []

    with open(file_path, "r") as file:
        for line_number, line in enumerate(file, 1):
            for regex, sed_cmd_snippet in regex_sed_commands:
                if re.search(regex, line):
                    sed_cmd = f"{line_number}{sed_cmd_snippet}"
                    sed_commands.append(sed_cmd)

    return sed_commands


if __name__ == "__main__":
    file_path = sys.argv[1] if len(sys.argv) > 1 else "gilded_rose.jq"
    sed_cmds = generate_sed_commands(file_path)
    for cmd in sed_cmds:
        print(cmd)
