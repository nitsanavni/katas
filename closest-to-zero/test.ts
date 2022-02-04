import test from "ava";
import fc from "fast-check";
import { inspect } from "util";

const minBy = <T>(arr: T[], mapper: (t: T) => number): T | undefined => {
  let ret = arr[0];

  for (const t of arr) {
    if (mapper(t) < mapper(ret)) {
      ret = t;
    }
  }

  return ret;
};

const closestToZero = (arr: number[]) => minBy(arr, Math.abs);

test.todo("tie break - take the positive one");

test("absolute value of result equals min of absolute values", (t) => {
  const { failed, counterexample } = fc.check(
    fc.property(
      fc.array(fc.integer(), { minLength: 0 }),
      (arr) => Math.min(...arr.map(Math.abs)) === Math.abs(closestToZero(arr)!)
    )
  );

  t.false(failed, `counter example: ${inspect(counterexample)}`);
});

test("non-positive numbers - maximum", (t) => {
  t.notThrows(() =>
    fc.assert(
      fc.property(
        fc.array(
          fc.nat().map((x) => -x),
          { minLength: 1 }
        ),
        (arrOfNonPositives) =>
          Math.max(...arrOfNonPositives) === closestToZero(arrOfNonPositives)
      )
    )
  );
});

test("non-negative numbers - minimum", (t) => {
  t.notThrows(() =>
    fc.assert(
      fc.property(
        fc.array(fc.nat(), { minLength: 1 }),
        (arrOfNaturals) =>
          Math.min(...arrOfNaturals) === closestToZero(arrOfNaturals)
      )
    )
  );
});

test("zero is always closest to zero", (t) => {
  t.notThrows(() =>
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.array(fc.integer()),
        (firstValues, lastValues) => {
          const arrWithZero = [...firstValues, 0, ...lastValues];

          return 0 === closestToZero(arrWithZero);
        }
      )
    )
  );
});

test("empty array - undefined", (t) => {
  t.notThrows(() =>
    fc.assert(
      fc.property(
        fc.array(fc.integer(), { maxLength: 0 }),
        (arr) => undefined === closestToZero(arr)
      )
    )
  );
});

test("remind me - how does fast-check work?", (t) => {
  t.notThrows(() =>
    fc.assert(
      fc.property(fc.nat(), (n) => n >= 0),
      { numRuns: 2000 }
    )
  );
});
