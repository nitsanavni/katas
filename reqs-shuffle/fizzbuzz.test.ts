import { expect, test } from "bun:test";

import { makeSelfCountingFizzbuzz, makePure } from "./fizzbuzz.js";

const pure = makePure(() => 0);

test("mul of 11 - bang / zbang", () => {
    expect(makePure(() => 0)(11)).toEqual("Bang");
    expect(makePure(() => 1)(11)).toEqual("Zbang");
});

test("if n contains the digit `7` result is Whizz", () => {
    expect(pure(7)).toEqual("Wizz");
    expect(pure(17)).toEqual("Wizz");
    expect(pure(27)).toEqual("Wizz");
    expect(pure(71)).toEqual("Wizz");
    expect(pure(72)).toEqual("Wizz");
});

test("multiple of 5 - Buzz", () => {
    expect(pure(5)).toEqual("Buzz");
});

test("does not get a input, tracks the number of calls internally", () => {
    const selfCounting = makeSelfCountingFizzbuzz();

    expect(selfCounting()).toEqual(1);
    expect(selfCounting()).toEqual(2);
    expect(selfCounting()).toEqual(3);
});
