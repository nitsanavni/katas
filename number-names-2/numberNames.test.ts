import { expect, test } from "bun:test";
import { numberName } from "./numberNames";

test("1 should be 'one'", () => {
  expect(numberName(1)).toBe('one');
});
