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
  [25, 'twenty-five'], // Added additional random test case
  [30, 'thirty'], // Added additional random test case
  [35, 'thirty-five'], // Added additional random test case
  [42, 'forty-two'], // Added additional random test case
  [50, 'fifty'], // Added additional random test case
  [67, 'sixty-seven'], // Added additional random test case
  [75, 'seventy-five'], // Added additional random test case
  [89, 'eighty-nine'], // Added additional random test case
  [97, 'ninety-seven'], // Added additional random test case
  [100, 'one hundred'], // Added test case for number 100
  [101, 'one hundred one'], // New additional test case
  [123, 'one hundred twenty-three'], // New additional test case
  [250, 'two hundred fifty'], // New additional test case
  [305, 'three hundred five'], // New additional test case
  [412, 'four hundred twelve'], // New additional test case
  [598, 'five hundred ninety-eight'], // New additional test case
  [700, 'seven hundred'], // New additional test case
  [850, 'eight hundred fifty'], // New additional test case
  [999, 'nine hundred ninety-nine'] // New additional test case
];

testCases.forEach(([input, expected]) => {
  test(`${input} should be '${expected}'`, () => {
    expect(numberName(input)).toBe(expected);
  });
});
