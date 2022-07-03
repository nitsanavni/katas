import { EOL } from "os";

import range from "./range";

export const outlineExamples = [
  "0|a",
  "0|a\n1|b",
  "0|a\n1|b\n1|c",
  `0|a
1|b
2|c
1|d
2|s|1
2|2
2|3`,
  range(10)
    .map((i) => `${i}|${i}`)
    .join(EOL),
  "0|s|selected",
];

export default outlineExamples;
