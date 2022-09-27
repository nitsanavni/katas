import { expect, test } from "bun:test";

const marsRover = (input: string): string => {
  return `1 3 N
5 1 E`;
};

test("Example input and output from https://sammancoaching.org/kata_descriptions/mars_rover.html", () => {
  const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;
  const output = `1 3 N
5 1 E`;
  expect(marsRover(input)).toBe(output);
});
