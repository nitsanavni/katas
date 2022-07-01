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

const format = (outlineString: string) => {
  const nodes = parse(outlineString);

  const formatNode = (i: number): string[] => {
    const node = nodes[i];

    const directChildren: number[] = [];

    for (let j = i + 1; j < nodes.length; j++) {
      const candidate = nodes[j];

      // TODO - extract `find()`
      const isDirectChild = candidate.indentation == node.indentation + 1;

      if (isDirectChild) {
        directChildren.push(j);
      } else if (candidate.indentation <= node.indentation) {
        break;
      }
    }

    return directChildren.length == 0
      ? [node.body]
      : cat([node.body], directChildren.flatMap(formatNode));
  };

  return formatNode(0);
};

test("parse outline", (t) => {
  const outlineString = "0|a\n0|b";
  t.snapshot(parse(outlineString), outlineString);
});

test("parse outline string", (t) => {
  ["0|a", "1|b"].map((line) => t.snapshot(parseLine(line), line));
});

const range = (end: number): number[] => {
  const ret: number[] = [];

  for (let i = 0; i < end; i++) {
    ret.push(i);
  }

  return ret;
};

test("format", (t) => {
  [
    "0|a",
    "0|a\n1|b",
    "0|a\n1|b\n1|c",
    `0|a
1|b
2|c
1|d
2|1
2|2
2|3`,
    range(10)
      .map((i) => `${i}|${i}`)
      .join(EOL),
  ].map((outline) => t.snapshot(format(outline), outline));
});

const w = (lines: string[]): number => Math.max(...lines.map((l) => l.length));
const h = (lines: string[]): number => lines.length;

const cat = (lhs: string[], rhs: string[]): string[] => {
  const lw = w(lhs);
  const lh = h(lhs);
  const rh = h(rhs);

  const ret: string[] = [];

  const mh = Math.max(lh, rh);

  for (let i = 0; i < mh; i++) {
    const li = i - ((mh - lh) >> 1);
    const ri = i - ((mh - rh) >> 1);

    const l = lhs[li] || "";
    const r = rhs[ri] || "";
    const p = "".padEnd(lw - l.length, " ");
    const connector = mh == 1 ? "─" : i == 0 ? "┌" : i == mh - 1 ? "└" : "│";

    ret.push(`${l}${p}${connector}${r}`);
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
