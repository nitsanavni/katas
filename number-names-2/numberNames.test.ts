import { expect, test } from "bun:test";

test("1 should be 'one'", () => {
  expect(numberName(1)).toBe('two'); // This assertion is intentionally incorrect
});
