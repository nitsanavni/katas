import { describe, test, expect } from "bun:test";

const isMultipleOf = (m: number) => (n: number) => n % m === 0;

test("returns true for multiples of 3", () => {
    expect(isMultipleOf(3)(3)).toBe(true);
    expect(isMultipleOf(3)(6)).toBe(true);
    expect(isMultipleOf(3)(9)).toBe(true);
});

test("returns false for non-multiples of 3", () => {
    expect(isMultipleOf(3)(2)).toBe(false);
    expect(isMultipleOf(3)(5)).toBe(false);
    expect(isMultipleOf(3)(8)).toBe(false);
});

const code = (obj: { d: number; code: string }) =>
    and(isMultipleOf(obj.d), (x: number) => obj.code);
describe("code", () => {
    test("returns the code for multiples of 3", () => {
        expect(code({ d: 3, code: "Fizz" })(3)).toBe("Fizz");
        expect(code({ d: 3, code: "Fizz" })(6)).toBe("Fizz");
        expect(code({ d: 3, code: "Fizz" })(9)).toBe("Fizz");
    });

    test("returns an empty string for non-multiples of 3", () => {
        expect(code({ d: 3, code: "Fizz" })(2)).toBe("");
        expect(code({ d: 3, code: "Fizz" })(5)).toBe("");
        expect(code({ d: 3, code: "Fizz" })(8)).toBe("");
    });
});
