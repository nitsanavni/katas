import { EOL } from "os";

import { OutlineNode } from "./outline-node";

// exported for testing only
export const parseLine = (line: string): OutlineNode | undefined => {
  // a line looks like this: `${indentation}|[${flags}|]${body}`
  const m = /(\d+)\|((s)?(c)?(f)?\|)?(.*)/.exec(line)!;

  if (!m) {
    return undefined;
  }

  return {
    body: m[6],
    ...(m[3] == "s" ? { selected: true } : {}),
    ...(m[4] == "c" ? { collapsed: true } : {}),
    ...(m[5] == "f" ? { focused: true } : {}),
    indentation: +m[1],
  };
};

export const parse = (outline: string): OutlineNode[] =>
  outline
    .split(EOL)
    .map(parseLine)
    // TODO - extract `compact`
    .filter((l) => !!l) as OutlineNode[];

export default parse;
