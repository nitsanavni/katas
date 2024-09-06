import { expect, test } from "bun:test";
import { numberName } from "./numberNames";

const testCases = [
  { input: 1, expected: 'one' },
  { input: 2, expected: 'two' },
  { input: 3, expected: 'three' },
  { input: 4, expected: 'four' },
  { input: 5, expected: 'five' },
  { input: 6, expected: 'six' },
  { input: 7, expected: 'seven' },
  { input: 8, expected: 'eight' },
  { input: 9, expected: 'nine' },
  { input: 10, expected: 'ten' },
];

testCases.forEach(({ input, expected }) => {
  test(`${input} should be '${expected}'`, () => {
    expect(numberName(input)).toBe(expected);
  });
});
