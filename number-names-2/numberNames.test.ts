import { expect, test } from "bun:test";
import { numberName } from "./numberNames";

const testCases: [number, string][] = [
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
  [4, 'four'],
  [5, 'five'],
  [6, 'six'],
  [7, 'seven'],
  [8, 'eight'],
  [9, 'nine'],
  [10, 'ten'],
];

testCases.forEach(([input, expected]) => {
  test(`${input} should be '${expected}'`, () => {
    expect(numberName(input)).toBe(expected);
  });
});
