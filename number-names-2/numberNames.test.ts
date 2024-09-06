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
  [11, 'eleven'],
  [12, 'twelve'],
  [13, 'thirteen'],
  [14, 'fourteen'],
  [15, 'fifteen'],
  [16, 'sixteen'],
  [17, 'seventeen'],
  [18, 'eighteen'],
  [19, 'nineteen'],
  [20, 'twenty'],
  [21, 'twenty-one'],
  [25, 'twenty-five'],
  [30, 'thirty'],
  [35, 'thirty-five'],
  [42, 'forty-two'],
  [50, 'fifty'],
  [67, 'sixty-seven'],
  [75, 'seventy-five'],
  [89, 'eighty-nine'],
  [97, 'ninety-seven'],
  [100, 'one hundred'],
  [101, 'one hundred one'],
  [123, 'one hundred twenty-three'],
  [250, 'two hundred fifty'],
  [305, 'three hundred five'],
  [412, 'four hundred twelve'],
  [598, 'five hundred ninety-eight'],
  [700, 'seven hundred'],
  [850, 'eight hundred fifty'],
  [999, 'nine hundred ninety-nine']
];

testCases.forEach(([input, expected]) => {
  test(`${input} should be '${expected}'`, () => {
    expect(numberName(input)).toBe(expected);
  });
});
