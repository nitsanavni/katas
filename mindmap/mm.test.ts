import test from "ava";
import { EOL } from "os";

import formatMindmap from "./format-mindmap";
import outlineExamples from "./outline-examples";
import parse from "./parse";

type Node = {
  body: string;
  indentation: number;
  selected?: boolean;
};

const formatOutlineLine = ({ indentation, selected, body }: Node): string =>
  `${indentation}|${selected ? "s|" : ""}${body}`;

const formatOutline = (nodes: Node[]): string[] => nodes.map(formatOutlineLine);

type Transform = (nodes: Node[]) => Node[];

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
