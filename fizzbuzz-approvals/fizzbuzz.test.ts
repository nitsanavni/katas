import test from "ava";
import { range } from "lodash";

type FizzBuzz = number | "Fizz" | "Buzz" | "FizzBuzz";

const fizzbuzz = (n: number): FizzBuzz => {
  return n % 3 == 0 ? "Fizz" : n % 5 == 0 ? "Buzz" : n;
};

const printer = (fb: typeof fizzbuzz): string =>
  `|n|fizzbuzz(n)|
    |---|---|
    ${range(1, 101)
      .map((n) => `|${n}|${fb(n)}|`)
      .join("\n")}}`;

test("fizzbuzz", ({ snapshot }) => snapshot(printer(fizzbuzz)));
