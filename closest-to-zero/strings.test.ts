import test from "ava";
import fc from "fast-check";
import { inspect } from "util";

const closestToZero = (arr: string[]): string | undefined => {
  let ret = arr[0];

  const similarityToZero = (str: string) =>
    "zero".split("").filter((letterInZero) => str.includes(letterInZero))
      .length;

  for (const str of arr) {
    if (similarityToZero(str) > similarityToZero(ret)) {
      ret = str;
    }
  }

  return ret;
};

test("contains some letters from 'zero'", (t) => {
  const { failed, counterexample } = fc.check(
    fc.property(
      fc.array(
        fc
          .string()
          .filter((s) =>
            "zero".split("").every((letter) => !s.includes(letter))
          )
      ),
      fc.array(
        fc
          .string()
          .filter((s) =>
            "zero".split("").every((letter) => !s.includes(letter))
          )
      ),
      fc
        .string()
        .filter((s) => "zero".split("").some((letter) => s.includes(letter))),
      (disimilarToZero, moreDisimilarToZero, similarToZero) => {
        return (
          similarToZero ==
          closestToZero([
            ...disimilarToZero,
            similarToZero,
            ...moreDisimilarToZero,
          ])
        );
      }
    )
  );

  t.false(failed, `counter: ${inspect(counterexample)}`);
});

test("'zero' is always closest to zero", (t) => {
  const { failed, counterexample } = fc.check(
    fc.property(
      fc.array(fc.string()),
      fc.array(fc.string()),
      (firstStrings, lastStrings) => {
        return (
          "zero" == closestToZero([...firstStrings, "zero", ...lastStrings])
        );
      }
    )
  );

  t.false(failed, `counter: ${inspect(counterexample)}`);
});

test("single element is closest", (t) => {
  const { failed, counterexample } = fc.check(
    fc.property(fc.string(), (str: string) => {
      return str == closestToZero([str]);
    })
  );

  t.false(failed, `counter: ${inspect(counterexample)}`);
});
