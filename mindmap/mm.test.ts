import test from "ava";
import { EOL } from "os";
import { inspect } from "util";

type Node = {
  body: string;
  indentation: number;
};

const parseLine = (line: string): Node => {
  const m = /(\d+)\|(.*)/.exec(line)!;

  return {
    body: m[2],
    indentation: +m[1],
  };
};

const parse = (outline: string): Node[] => outline.split(EOL).map(parseLine);

const format = (outline: string) => {
  let ret = "";

  parse(outline)
    .map(({ body }) => body)
    .join("\n");

  return ret;
};

test("parse outline", (t) => {
  const outlineString = "0|a\n0|b";
  t.snapshot(parse(outlineString), outlineString);
});

test("parse outline string", (t) => {
  ["0|a", "1|b"].map((line) => t.snapshot(parseLine(line), line));
});

test("format", (t) => {
  ["0|a", "0|a\n0|b", "0|a\n1|b"].map((outline) =>
    t.snapshot(format(outline), outline)
  );
});

const cat = (lhs: string, rhs: string) => `${lhs} ${rhs}`;

test("concat blocks", (t) => {
  [["a", "b"]].map(([lhs, rhs]) =>
    t.snapshot(cat(lhs, rhs), `${lhs} + ${rhs}`)
  );
});
