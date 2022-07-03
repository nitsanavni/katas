import test from "ava";
import { EOL } from "os";

import formatMindmap from "./format-mindmap";
import outlineExamples from "./outline-examples";
import { OutlineNode } from "./outline-node";
import parse from "./parse";
import { Transform } from "./transform";

const formatOutlineLine = ({
  indentation,
  selected,
  body,
}: OutlineNode): string => `${indentation}|${selected ? "s|" : ""}${body}`;

const formatOutline = (nodes: OutlineNode[]): string[] =>
  nodes.map(formatOutlineLine);

const home: Transform = (nodes) => {
  const [first, ...rest] = nodes;

  if (!first) {
    return [];
  }

  return [
    { ...first, selected: true },
    ...rest.map(({ body, indentation }) => ({ body, indentation })),
  ];
};

test("home", (t) => {
  ["0|a", "0|s|a", "0|a\n1|b"].forEach((outline) =>
    t.snapshot(formatMindmap(home(parse(outline))))
  );
});

test("formatOutline", (t) => {
  outlineExamples.map((outline) =>
    t.deepEqual(formatOutline(parse(outline)), outline.split(EOL))
  );
});
