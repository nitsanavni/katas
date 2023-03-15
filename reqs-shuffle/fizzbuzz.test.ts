import { test, expect } from "bun:test";

const makeCounter =
    (i = 0) =>
    () =>
        i++;

test("counter", () => {
    const counter = makeCounter();

    expect(counter()).toEqual(0);
    expect(counter()).toEqual(1);
    expect(counter()).toEqual(2);
});

const pure = (n: number) => n;

const makeFizzbuzz = () => {
    const counter = makeCounter(1);

    return () => {
        return pure(counter());
    };
};

test("if n is a multiple of 7 result is Whizz", () => {
    expect(pure(7)).toEqual("Whizz");
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

    expect(fb()).toEqual(1);
    expect(fb()).toEqual(2);
    expect(fb()).toEqual(3);
});
