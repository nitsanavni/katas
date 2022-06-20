import { EOL } from "os";
import test from "ava";
import { range } from "lodash";

type FizzBuzz = number | "Fizz" | "Buzz" | "FizzBuzz";

const fizzbuzz = (n: number): FizzBuzz =>
  n % 15 == 0 ? "FizzBuzz" : n % 3 == 0 ? "Fizz" : n % 5 == 0 ? "Buzz" : n;

const printer = (fb: typeof fizzbuzz): string =>
  `|n|fizzbuzz(n)|${EOL}|---|---|${EOL}${range(1, 101)
    .map((n) => `|${n}|${fb(n)}|`)
    .join(EOL)}`;

test("fizzbuzz", ({ snapshot }) => snapshot(printer(fizzbuzz)));
