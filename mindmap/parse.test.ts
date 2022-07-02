import test from "ava";

import { parse, parseLine } from "./parse";

test("parse outline", (t) => {
  const outlineString = "0|a\n0|b";
  t.snapshot(parse(outlineString), outlineString);
});

test("parse outline string", (t) => {
  ["0|a", "1|b", "2|s|c"].map((line) => t.snapshot(parseLine(line), line));
});
