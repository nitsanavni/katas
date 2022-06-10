import test from "ava";
import { constant, each, find, identity, noop, reduce } from "lodash";

// fizzbuzz(n) = n
// divisable by 3 - fizz
// divisable by 5 - buzz
// divisable by both - fizzbuzz

type FizzBuzz = number | "fizz" | "buzz" | "fizzbuzz";
type FizzBuzzer = (n: number) => FizzBuzz;

type Predicate = (n: number) => boolean;

const divisable =
  (d: number): Predicate =>
  (n) =>
    n % d == 0;

const checkFor =
  (predicate: Predicate) =>
  (yes: FizzBuzzer) =>
  (no: FizzBuzzer) =>
  (n: number) =>
    predicate(n) ? yes(n) : no(n);

const stop = identity;
const standard = checkFor(divisable(1))(identity);
const checkThree = checkFor(divisable(3))(constant("fizz"));
const checkFive = checkFor(divisable(5))(constant("buzz"));
const checkBoth = checkFor(divisable(15))(constant("fizzbuzz"));

const fizzbuzzComposedFunctions: FizzBuzzer = checkBoth(
  checkThree(checkFive(standard(stop)))
);

const fizzbuzzFind: FizzBuzzer = (n: number) => {
  const [, fizzbuzz] = find(
    [
      [divisable(15), "fizzbuzz"],
      [divisable(3), "fizz"],
      [divisable(5), "buzz"],
      [constant(true), n],
    ] as [Predicate, FizzBuzz][],
    ([predicate]) => predicate(n)
  )!;

  return fizzbuzz;
};

// TODO - this can be extracted as `product`
each([fizzbuzzFind, fizzbuzzComposedFunctions], (fizzbuzz) =>
  each(
    [
      [1, 1],
      [2, 2],
      [3, "fizz"],
      [4, 4],
      [5, "buzz"],
      [6, "fizz"],
      [7, 7],
      [8, 8],
      [9, "fizz"],
      [10, "buzz"],
      [15, "fizzbuzz"],
    ] as const,
    ([n, expected]) =>
      test(`${fizzbuzz.name}(${n}): ${expected}`, (t) =>
        t.is(fizzbuzz(n), expected))
  )
);
