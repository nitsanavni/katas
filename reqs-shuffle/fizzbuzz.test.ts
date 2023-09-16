import { expect, test } from "bun:test";

import { range } from "./range.js";

import { fbArrayInput, fbCalc, fizzbuzz } from "./fizzbuzz.js";

test("pure fn", () => {
    expect(fizzbuzz([])).toEqual([]);
    expect(fizzbuzz([8])).toEqual([""]);
    expect(fizzbuzz([9])).toEqual(["Fizz"]);
});

test("accept an array of numbers instead of a single number", () => {
    expect(fbArrayInput([1, 2, 3, 4, 5, 6])).toEqual([
        "",
        "",
        "Fizz",
        "",
        "",
        "Fizz",
    ]);
});

test("result is a string", () => {
    range(10).forEach((n) => expect(typeof fbCalc(n)).toBe("string"));
});

test("if n is a multiple of 3 result is Fizz", () => {
    // multiples of 3
    expect(fbCalc(3)).toEqual("Fizz");
    expect(fbCalc(6)).toEqual("Fizz");
    expect(fbCalc(9)).toEqual("Fizz");
    expect(fbCalc(12)).toEqual("Fizz");
    // non multiples of 3
    expect(fbCalc(2)).toBe("");
});

test("should be able to handle negative input numbers", () => {
    // https://brilliant.org/wiki/negative-multiples/
    // multiples of 3
    expect(fbCalc(-3)).toEqual("Fizz");
    expect(fbCalc(-9)).toEqual("Fizz");
    expect(fbCalc(-15)).toEqual("Fizz");
    // non multiples of 3
    expect(fbCalc(-2)).toBe("");
    expect(fbCalc(-1)).toBe("");
});

test.skip("obsolete - does not get a input, tracks the number of calls internally", () => {});
