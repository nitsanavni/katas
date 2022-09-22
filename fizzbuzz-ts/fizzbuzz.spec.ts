import test from "ava";

import { range } from "lodash";

const fizzbuzz = () => {
  return fizzbuzzUpTo(20).join("\n");
};

test("should fizzbuzz", (t) => {
  t.deepEqual(
    fizzbuzz(),
    `1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz`
  );
});

function fizzbuzzFor(n: number): string {
  return n % 15 == 0
    ? "FizzBuzz"
    : n % 3 == 0
    ? "Fizz"
    : n % 5 == 0
    ? "Buzz"
    : `${n}`;
}

function fizzbuzzUpTo(n: number) {
  return range(1, n + 1).map(fizzbuzzFor);
}

// Write a program that prints the numbers from 1 to 100. But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”.

// Sample output:

// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
// 7
// 8
// Fizz
// Buzz
// 11
// Fizz
// 13
// 14
// FizzBuzz
// 16
// 17
// Fizz
// 19
// Buzz
// ... etc up to 100
