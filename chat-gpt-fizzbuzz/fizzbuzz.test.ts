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

const codes = (specs) => (n) =>
    specs
        .filter((spec) => isMultipleOf(spec.d)(n))
        .map((spec) => spec.code)
        .join("");

const s = JSON.stringify;

describe("codes", () => {
    test("should return a function that takes a number and returns a string", () => {
        const specs = [
            { d: 3, code: "Fizz" },
            { d: 5, code: "Buzz" },
            { d: 7, code: "whizz" },
        ];
        const result = codes(specs);
        expect(typeof result).toBe("function");
        expect(s(result(3))).toBe(s("Fizz"));
        expect(s(result(5))).toBe(s("Buzz"));
        expect(s(result(7))).toBe(s("whizz"));
        expect(s(result(11))).toBe(s(""));
        expect(s(result(15))).toBe(s("FizzBuzz"));
    });
});

const game = (specs) => {
    const codes = (n) =>
        specs
            .filter((spec) => isMultipleOf(spec.d)(n))
            .map((spec) => spec.code)
            .join("");

    return (n) => {
        // Use the `codes` function to get the code string for the given number
        const codeString = codes(n);

        // Return the original number as a string if there's no code string,
        // otherwise return the code string
        return codeString ? codeString : String(n);
    };
};
describe("game", () => {
    test("should return a function that takes a number and returns a string", () => {
        const specs = [
            { d: 3, code: "Fizz" },
            { d: 5, code: "Buzz" },
            { d: 7, code: "whizz" },
        ];
        const result = game(specs);
        expect(typeof result).toBe("function");
        expect(s(result(3))).toBe(s("Fizz"));
        expect(s(result(5))).toBe(s("Buzz"));
        expect(s(result(7))).toBe(s("whizz"));
        expect(s(result(11))).toBe(s("11"));
        expect(s(result(15))).toBe(s("FizzBuzz"));
    });
});
