import test from "ava";
import { EOL } from "os";

type Node = {
  body: string;
  indentation: number;
  selected?: boolean;
};

const parseLine = (line: string): Node => {
  // a line looks like this: `${indentation}|[${flags}|]${body}`
  const m = /(\d+)\|((s)?\|)?(.*)/.exec(line)!;

  return {
    body: m[4],
    ...(m[3] == "s" ? { selected: true } : {}),
    indentation: +m[1],
  };
};

const parse = (outline: string): Node[] => outline.split(EOL).map(parseLine);

const find = <T>(
  arr: T[],
  predicate: (t: T) => boolean,
  startIndex = 0
): [T, number] | undefined => {
  for (let i = startIndex; i < arr.length; i++) {
    const item = arr[i];
    if (predicate(item)) return [item, i];
  }
};

const filter = <T>(
  arr: T[],
  predicate: (t: T, index: number) => boolean,
  startIndex: number,
  endIndex: number
): [T, number][] => {
  const ret: [T, number][] = [];

  for (let i = startIndex; i < Math.min(arr.length, endIndex); i++) {
    const item = arr[i];
    if (predicate(item, i)) ret.push([item, i]);
  }

  return ret;
};

const format = (outlineString: string) => {
  const nodes = parse(outlineString);

  const formatNode = (i: number): string[] => {
    const node = nodes[i];

    const [, end] = find(
      nodes,
      (candidate) => candidate.indentation <= node.indentation,
      i + 1
    ) || [undefined, nodes.length];

    const directChildren: number[] = filter(
      nodes,
      (candidate) => candidate.indentation == node.indentation + 1,
      i + 1,
      end
    ).map(([, i]) => i);

    const childless = directChildren.length == 0;

    return childless
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
  ["0|a", "1|b", "2|s|c"].map((line) => t.snapshot(parseLine(line), line));
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

    const singleLine = mh == 1;
    const firstLine = i == 0;
    const lastLine = i == mh - 1;

    const connector = singleLine ? "─" : firstLine ? "┌" : lastLine ? "└" : "│";

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
