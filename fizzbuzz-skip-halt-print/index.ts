type cmd = ["skip"] | ["halt"] | ["print", string | number];

type Program = cmd[];

type hole = "hole";

// type Context = ()

const interpret = (p: Program): string => {
    if (p.length == 0) return "";
    const [c, ...rest] = p;
    if (c[0] == "skip") return interpret(rest);
    if (c[0] == "halt") return "";
    return String(c[1]) + interpret(rest);
};

console.log(
    interpret([
        ["print", 42],
        ["skip"],
        ["print", "fizz"],
        ["halt"],
        ["print", "unreachable"],
    ])
);
