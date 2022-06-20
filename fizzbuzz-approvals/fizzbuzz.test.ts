import test from "ava";
import { range } from "lodash";

type FizzBuzz = number | "Fizz" | "Buzz" | "FizzBuzz";

const fizzbuzz = (n: number): FizzBuzz => {
  return 0;
};

const printer = (fb: typeof fizzbuzz): string =>
  `|n|fizzbuzz(n)|
    |---|---|
    ${range(1, 101)
      .map((n) => `|${n}|${fb(n)}|`)
      .join("\n")}}`;

test("fizzbuzz", (t) => {
  t.snapshot(printer(fizzbuzz));
});
