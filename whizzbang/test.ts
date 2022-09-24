import test from "ava";
import { chain, multiply, range } from "lodash";

const spec = [
  [3, "Fizz"],
  [5, "Buzz"],
  [7, "Whizz"],
  [11, "Bang"],
] as const;

const divisable = (d: number) => (n: number) => n % d == 0;

const fizzEtc = (n: number): string =>
  chain(spec)
    .filter(([d]) => divisable(d)(n))
    .map(1)
    .join("")
    .replace(/^$/, String(n))
    .value();

test("fizzbuzzwhizzbang", (t) => {
  const mul = chain(spec).map(0).reduce(multiply, 1).value();

  t.snapshot(range(1, mul + 1).map((n) => `${n}: ${fizzEtc(n)}`));
});
