import test from "ava";
import fc from "fast-check";
import { inspect } from "util";

const closestToZero = (arr: string[]) => {
  return arr[0];
};

test("single element is closest", (t) => {
  const { failed, counterexample } = fc.check(
    fc.property(fc.string(), (str: string) => {
      return str == closestToZero([str]);
    })
  );

  t.false(failed, `counter: ${inspect(counterexample)}`);
});
