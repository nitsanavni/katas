import { EOL } from "os";
import { test } from "./approvals";

type Spec = [d: number, code: string];

const specs = [
    [3, "Fizz"],
    [5, "Buzz"],
] as Spec[];

const part =
    ([d, code]: readonly [d: number, code: string]) =>
    (n: number) =>
        n % d == 0 ? code : "";

const predicate =
    (n: number) =>
    ([d]: Spec) =>
        n % d == 0;

const code = ([_, code]: Spec): string => code;

const fizzbuzz = (n: number) =>
    specs.filter(predicate(n)).map(code).join("") || n;

const range = (length = 10) => Array.from({ length }, (_, i) => i + 1);

test("fizzbuzz", () =>
    range(35)
        .map((n) => `${n} -> ${fizzbuzz(n)}`)
        .join(EOL));
