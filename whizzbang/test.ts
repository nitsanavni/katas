import test from "ava";
import { chain, multiply, range } from "lodash";

const spec = [
  { divisor: 3, codeName: "Fizz" },
  { divisor: 5, codeName: "Buzz" },
  { divisor: 7, codeName: "Whizz" },
  { divisor: 11, codeName: "Bang" },
] as const;

const fizzbuzz = (n: number): string =>
  chain(spec)
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

const leastCommonMultiple = chain(spec)
  .map("divisor")
  .reduce(multiply, 1)
  .value();

const emptyString = /^$/;
