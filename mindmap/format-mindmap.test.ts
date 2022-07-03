import test from "ava";

import formatMindmap from "./format-mindmap";
import outlineExamples from "./outline-examples";
import parse from "./parse";

test("formatMindmap", (t) => {
  outlineExamples.map((outline) =>
    t.snapshot(formatMindmap(parse(outline)), outline)
  );
});
