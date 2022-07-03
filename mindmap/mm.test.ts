import test from "ava";
import { EOL } from "os";

import outlineExamples from "./outline-examples";
import { OutlineNode } from "./outline-node";
import parse from "./parse";

const formatOutlineLine = ({
  indentation,
  selected,
  body,
}: OutlineNode): string => `${indentation}|${selected ? "s|" : ""}${body}`;

const formatOutline = (nodes: OutlineNode[]): string[] =>
  nodes.map(formatOutlineLine);

test("formatOutline", (t) => {
  outlineExamples.map((outline) =>
    t.deepEqual(formatOutline(parse(outline)), outline.split(EOL))
  );
});
