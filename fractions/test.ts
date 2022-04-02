import test from "ava";
import fc from "fast-check";

test("complex", (t) => {
  const prop = (i: number) => {
    i < 8;
  };

  fc.check(fc.property(fc.integer(), prop));

  t.false(false);
});
