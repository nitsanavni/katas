import test from "ava";

import cat from "./cat";

test("concat blocks", (t) => {
  [
    [["a"], ["b"]],
    [["a"], ["b", "c"]],
    [["a"], ["b", "c", "d"]],
    [
      ["a", "a22"],
      ["b", "c", "d"],
    ],
    [["a", "b", "ccc"], ["d"]],
  ].map(([lhs, rhs]) => t.snapshot(cat(lhs, rhs), `${lhs} + ${rhs}`));
});
