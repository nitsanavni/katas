import { expect, test } from "bun:test";

function numberName(num: number): string {
  // empty body
}

test("1 should be 'one'", () => {
  expect(numberName(1)).toBe('one');
});
