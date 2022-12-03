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

const code = (obj: { d: number; code: string }) => (x: number) =>
    (isMultipleOf(obj.d)(x) && obj.code) || "";
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

const codes = (specs: Array<{ d: number; code: string }>) => {
    return (n: number) =>
        specs.map((spec) => (isMultipleOf(spec.d)(n) ? spec.code : ""));
};

const s = JSON.stringify;

describe("codes", () => {
    test("should return a function that takes a number and returns an array of strings", () => {
        const specs = [
            { d: 3, code: "Fizz" },
            { d: 5, code: "Buzz" },
            { d: 7, code: "FizzBuzz" },
        ];
        const result = codes(specs);
        expect(typeof result).toBe("function");
        expect(s(result(3))).toBe(s(["Fizz", "", ""]));
    });
});
