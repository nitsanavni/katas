import test from "ava";
import { each, identity } from "lodash";

// fizzbuzz(n) = n
// divisable by 3 - fizz
// divisable by 5 - buzz
// divisable by both - fizzbuzz

type FizzBuzz = number | "fizz" | "buzz" | "fizzbuzz";
type Daisy = (n: number) => FizzBuzz;

const divisable = (n: number, d: number) => n % d == 0;

const checkFor = (d: number, res: FizzBuzz) => (daisy: Daisy) => (n: number) =>
  divisable(n, d) ? res : daisy(n);

const checkFive = checkFor(5, "buzz");
const checkThree = checkFor(3, "fizz");
const checkBoth = checkFor(15, "fizzbuzz");
const standard = identity;

const fizzbuzz: Daisy = checkBoth(checkThree(checkFive(standard)));

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
