import test from "ava";
import { constant, each, identity, noop } from "lodash";

// fizzbuzz(n) = n
// divisable by 3 - fizz
// divisable by 5 - buzz
// divisable by both - fizzbuzz

type FizzBuzz = number | "fizz" | "buzz" | "fizzbuzz";
type FizzBuzzer = (n: number) => FizzBuzz;

const divisable = (n: number, d: number) => n % d == 0;

const checkFor =
  (d: number) => (yes: FizzBuzzer) => (no: FizzBuzzer) => (n: number) =>
    divisable(n, d) ? yes(n) : no(n);

const stop = identity;
const standard = checkFor(1)(identity);
const checkFive = checkFor(5)(constant("buzz"));
const checkThree = checkFor(3)(constant("fizz"));
const checkBoth = checkFor(15)(constant("fizzbuzz"));

const fizzbuzz: FizzBuzzer = checkBoth(checkThree(checkFive(standard(stop))));

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
    test(`fizzbuzz(${n}): ${expected}`, (t) => t.is(fizzbuzz(n), expected))
);
