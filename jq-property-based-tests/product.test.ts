import { test, expect } from "bun:test";
import fc from "fast-check";

test("test the fast-check", () => {
    fc.assert(fc.property(fc.string(), (s) => s.length < 10));
});
