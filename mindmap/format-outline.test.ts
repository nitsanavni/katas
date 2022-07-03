import test from "ava";
import { EOL } from "os";

import formatOutline from "./format-outline";
import outlineExamples from "./outline-examples";
import parse from "./parse";

test("formatOutline", (t) => {
  outlineExamples.map((outline) =>
    t.deepEqual(formatOutline(parse(outline)), outline.split(EOL))
  );
});
