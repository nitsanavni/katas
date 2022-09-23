import test from "ava";
import { chain, range } from "lodash";

const divisableBy = (d: number) => (n: number) => n % d == 0;

const fizzEtc = (n: number): string =>
  chain([
    [divisableBy(3), "Fizz"],
    [divisableBy(5), "Buzz"],
    [divisableBy(7), "Whizz"],
    [divisableBy(11), "Bang"],
  ] as const)
    .filter(([divisable]) => divisable(n))
    .map(1)
    .join("")
    // huge hack 🤦
    .padStart(`${n}`.length, `${n}`)
    .value();

test("fizzbuzzwhizzbang", (t) => {
  t.snapshot(range(1, 3 * 5 * 7 * 11 + 1).map((n) => `${n}: ${fizzEtc(n)}`));
});
