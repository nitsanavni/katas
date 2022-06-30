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

const format = (outline: string) => "a";

test("parse outline", (t) => {
  const outlineString = "0|a\n0|b";
  t.snapshot(parse(outlineString), outlineString);
});

test("parse outline string", (t) => {
  ["0|a", "1|b"].map((line) => t.snapshot(parseLine(line), line));
});

test("format", (t) => {
  t.snapshot(format(`0|a`));
});
