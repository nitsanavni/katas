import test from "ava";

import formatMindmap from "./format-mindmap";
import home from "./home";
import parse from "./parse";

test("home", (t) => {
  ["0|a", "0|s|a", "0|a\n1|b"].forEach((outline) =>
    t.snapshot(formatMindmap(home(parse(outline))))
  );
});
