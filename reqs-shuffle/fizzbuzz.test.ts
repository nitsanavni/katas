import { test, expect } from "bun:test";

import { makeCounter, makeFizzbuzz, pureFizzbuzz } from "./fizzbuzz.js";

test("counter", () => {
    const counter = makeCounter();

    expect(counter()).toEqual(0);
    expect(counter()).toEqual(1);
    expect(counter()).toEqual(2);
});

test("if n is a multiple of 3 result is Fizz", () => {
    expect(pureFizzbuzz(3)).toEqual("Fizz");
    expect(pureFizzbuzz(72)).toEqual("Fizz");
});
test("if n contains the digit `7` result is Whizz", () => {
    expect(pureFizzbuzz(7)).toEqual("Whizz");
    expect(pureFizzbuzz(17)).toEqual("Whizz");
    expect(pureFizzbuzz(76)).toEqual("Whizz");
});

test("result is a string or number", () => {
    expect(pureFizzbuzz(7)).toEqual("Whizz");
    expect(pureFizzbuzz(8)).toEqual(8);
});

test("if n is a multiple of 7 result is Whizz", () => {
    expect(pureFizzbuzz(7)).toEqual("Whizz");
    expect(pureFizzbuzz(14)).toEqual("Whizz");
});

test("returns the result", () => {
    const fb = makeFizzbuzz();

    expect(fb()).toEqual(1);
});

test.skip("prints the result to stdout", async () => {
    // I need a driver
});

test("tracks the number of calls internally", () => {
    const fb = makeFizzbuzz();

    expect(fb()).toEqual(pureFizzbuzz(1));
    expect(fb()).toEqual(pureFizzbuzz(2));
    expect(fb()).toEqual(pureFizzbuzz(3));
});
