import test from "ava";
import { chain, multiply, range } from "lodash";

const spec = {
  3: "Fizz",
  5: "Buzz",
  7: "Whizz",
  11: "Bang",
} as const;

const namedSpec = chain(spec)
  .entries()
  .map(([d, codeName]) => ({ divisor: +d, codeName }))
  .value();

const fizzbuzz = (n: number): string =>
  chain(namedSpec)
    .filter(({ divisor }) => divisable(divisor)(n))
    .map("codeName")
    .join("")
    .replace(emptyString, String(n))
    .value();

test("fizzbuzzwhizzbang", (t) => {
  t.snapshot(
    range(1, leastCommonMultiple + 1).map((n) => `${n}: ${fizzbuzz(n)}`)
  );
});

const divisable = (d: number) => (n: number) => n % d == 0;

const leastCommonMultiple = chain(namedSpec)
  .map("divisor")
  .reduce(multiply, 1)
  .value();

const emptyString = /^$/;
