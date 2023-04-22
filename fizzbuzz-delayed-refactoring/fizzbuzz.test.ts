import { EOL } from "os";
import { test } from "./approvals";

const specs = [
    [3, "Fizz"],
    [5, "Buzz"],
] as const;

const part =
    ([d, code]: readonly [d: number, code: string]) =>
    (n: number) =>
        n % d == 0 ? code : "";

const fizzbuzz = (n: number) =>
    specs
        .map(part)
        .map((f) => f(n))
        .join("") || n;

const range = (length = 10) => Array.from({ length }, (_, i) => i + 1);

test("fizzbuzz", () =>
    range(15)
        .map((n) => `${n} -> ${fizzbuzz(n)}`)
        .join(EOL));
