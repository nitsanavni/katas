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
  [999, 'nine hundred ninety-nine'],
  [1000, 'one thousand'],
  [1234, 'one thousand two hundred thirty-four'],
  [2023, 'two thousand twenty-three'],
  [4500, 'four thousand five hundred'],
  [6789, 'six thousand seven hundred eighty-nine'],
  [9999, 'nine thousand nine hundred ninety-nine'],
  [10000, 'ten thousand'],
  [25000, 'twenty-five thousand'],
  [50000, 'fifty thousand'],
  [99999, 'ninety-nine thousand nine hundred ninety-nine'],
  [100000, 'one hundred thousand'],
  [250000, 'two hundred fifty thousand'],
  [500000, 'five hundred thousand'],
  [999999, 'nine hundred ninety-nine thousand nine hundred ninety-nine'],
  [1000000, 'one million'],
  [2500000, 'two million five hundred thousand'],
  [5000000, 'five million'],
  [10000000, 'ten million'],
  [25000000, 'twenty-five million'],
  [50000000, 'fifty million'],
  [999999999, 'nine hundred ninety-nine million nine hundred ninety-nine thousand nine hundred ninety-nine'],
  [123456789, 'one hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine'],
  [550000000, 'five hundred fifty million'],
  [765432100, 'seven hundred sixty-five million four hundred thirty-two thousand one hundred'],
  [999000000, 'nine hundred ninety-nine million'],
  [888888888, 'eight hundred eighty-eight million eight hundred eighty-eight thousand eight hundred eighty-eight'],
  [314159265, 'three hundred fourteen million one hundred fifty-nine thousand two hundred sixty-five'],
  // Additional test cases
  [1000000000000, 'one trillion'],
  [1234567890123, 'one trillion two hundred thirty-four billion five hundred sixty-seven million eight hundred ninety thousand one hundred twenty-three'],
  [999999999999, 'nine hundred ninety-nine billion nine hundred ninety-nine million nine hundred ninety-nine thousand nine hundred ninety-nine'],
  [500000000000, 'five hundred billion'],
  [750000000000, 'seven hundred fifty billion'],
  [893458260048001, 'eight hundred ninety-three trillion four hundred fifty-eight billion two hundred sixty million forty-eight thousand one'],
];

testCases.forEach(([input, expected]) => {
  test(`${input} should be '${expected}'`, () => {
    expect(numberName(input)).toBe(expected);
  });
});
