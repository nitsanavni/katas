const range = (e: number) => Array.from({ length: e }, (_, i) => i + 1);

type cmd = ["skip"] | ["halt"] | ["print", string | number];

type Program = cmd[];

const interpret = (p: Program): string => {
    if (p.length == 0) return "";
    const [c, ...rest] = p;
    if (c[0] == "skip") return interpret(rest);
    if (c[0] == "halt") return "";
    return String(c[1]) + interpret(rest);
};

type Context = (p: Program) => Program;

const context =
    (lhs: Program, rhs: Program) =>
    (p: Program): Program =>
        [...lhs, ...p, ...rhs];

const fizz =
    (n: number): Context =>
    (x: Program) =>
        n % 3 == 0 ? [["print", "fizz"], ...x, ["halt"]] : x;

const buzz =
    (n: number): Context =>
    (x: Program) =>
        n % 5 == 0 ? [["print", "buzz"], ...x, ["halt"]] : x;

const base =
    (n: number): Context =>
    (x: Program) =>
        [...x, ["print", n]];

const fb = (n: number): Program =>
    [base(n), fizz(n), buzz(n)].reduceRight(
        (prev, curr) => (p: Program) => curr(prev(p))
    )([["skip"]]);

const fizzbase = (n: number) => interpret(fb(n));

console.log("fizzbase");
range(15).map((n) => console.log(`${n} -> ${fizzbase(n)}`));

console.log("fizz context");
range(4).map((n) => console.log(`${n} -> ${interpret(fizz(n)([]))}`));

console.log("fizz");
console.log(interpret(context([["print", "fizz"]], [["skip"]])([])));

console.log(
    interpret([
        ["print", 42],
        ["skip"],
        ["print", "fizz"],
        ["halt"],
        ["print", "unreachable"],
    ])
);
