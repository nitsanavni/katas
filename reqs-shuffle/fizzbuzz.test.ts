import { test, expect } from "bun:test";

import {
    makeCounter,
    makeFizzbuzz as selfCountingFizzbuzz,
    pureFizzbuzz as fizzbuzz,
} from "./fizzbuzz.js";

test("counter", () => {
    const counter = makeCounter();

    expect(counter()).toEqual(0);
    expect(counter()).toEqual(1);
    expect(counter()).toEqual(2);
});

test("if n is a multiple of 3 result is Fizz", () => {
    expect(fizzbuzz(3)).toEqual("Fizz");
    expect(fizzbuzz(72)).toEqual("Fizz");
});
test("if n contains the digit `7` result is Whizz", () => {
    expect(fizzbuzz(7)).toEqual("Whizz");
    expect(fizzbuzz(17)).toEqual("Whizz");
    expect(fizzbuzz(76)).toEqual("Whizz");
});

test("result is a string or number", () => {
    expect(fizzbuzz(7)).toEqual("Whizz");
    expect(fizzbuzz(8)).toEqual(8);
});

test("if n is a multiple of 7 result is Whizz", () => {
    expect(fizzbuzz(7)).toEqual("Whizz");
    expect(fizzbuzz(14)).toEqual("Whizz");
});

test("returns the result", () => {
    const fb = selfCountingFizzbuzz();

    expect(fb()).toEqual(1);
});

test.skip("prints the result to stdout", async () => {
    // I need a driver
});

test.skip("tracks the number of calls internally", () => {
    const fb = selfCountingFizzbuzz();

    expect(fb()).toEqual(fizzbuzz(1));
    expect(fb()).toEqual(fizzbuzz(2));
    expect(fb()).toEqual(fizzbuzz(3));
});
