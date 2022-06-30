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

const w = (lines: string[]): number => Math.max(...lines.map((l) => l.length));
const h = (lines: string[]): number => lines.length;

const cat = (lhs: string[], rhs: string[]): string[] => {
  const lw = w(lhs);
  const lh = h(lhs);
  const rw = w(rhs);
  const rh = h(rhs);

  const ret: string[] = [];

  const mh = Math.max(lh, rh);

  for (let i = 0; i < mh; i++) {
    const li = i - ((mh - lh) >> 1);
    const ri = i - ((mh - rh) >> 1);

    const l = lhs[li] || "";
    const r = rhs[ri] || "";
    const p = "".padEnd(lw - l.length, " ");

    ret.push(`${l}${p} ${r}`);
  }

  return ret;
};

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
