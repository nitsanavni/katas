import { test, expect } from "bun:test";
import assert from "assert";

// constant
// identity
// divisible
// concatenate
// array of codes
// start with the spec

const constant = (x) => () => x;
const identity = (x) => x;
const isMultipleOf =
    (d: number) =>
    (n: number): boolean =>
        n % d == 0;
const cat = (a: string[]): string => a.join("");
const fizz: (n: number) => "" | "Fizz" = (n) =>
    isMultipleOf(3)(n) ? "Fizz" : "";
const condition =
    <A extends readonly any[], T, F>(predicate: (...arg: A) => boolean) =>
    (trueValue: T) =>
    (falseValue: F) =>
    (...arg: A) =>
        predicate(...arg) ? trueValue : falseValue;
const spec = { 3: "Fizz", 5: "Buzz" } as const;
type D = keyof typeof spec;
type C<d extends D> = typeof spec[d];
type Entry<d extends D> = [D, C<d>];
const aSpec = [
    [3, "Fizz"],
    [5, "Buzz"],
] as const;
const code =
    <d extends D>(d: d) =>
    (c: C<d>) =>
        condition(isMultipleOf(d))(c)("");
const buzz = condition<[number], "Buzz", "">(isMultipleOf(5))("Buzz" as const)(
    "" as const
);
const codes: (n: number) => ["Fizz" | "", "Buzz" | ""] = (n) =>
    aSpec.map(([d, c]) => code(d)(c)(n)) as ["Fizz" | "", "Buzz" | ""];

test("constant", () => {
    expect(constant("Fizz")()).toBe("Fizz");
});

test("identity", () => {
    expect(identity("Fizz")).toBe("Fizz");
});

test("isMultipleOf(d)", () => {
    const of3 = isMultipleOf(3);
    const of5 = isMultipleOf(5);
    expect(of3(3)).toBe(true);
    expect(of3(3 * 3)).toBe(true);
    expect(of3(5)).toBe(false);
    expect(of5(3)).toBe(false);
    expect(of5(5)).toBe(true);
});

test("cat", () => {
    expect(cat(["a", "b"])).toBe("ab");
    expect(cat(["Fizz", ""])).toBe("Fizz");
});

test("fizz", () => {
    expect(fizz(1)).toBe("");
    expect(fizz(3)).toBe("Fizz");
});

test("condition", () => {
    expect(condition(() => true)("a")("b")()).toBe("a");
    expect(condition(() => false)("a")("b")()).toBe("b");
});

test("buzz", () => {
    expect(
        condition<number[], "Buzz", "">(isMultipleOf(5))("Buzz" as const)(
            "" as const
        )(5)
    ).toBe("Buzz");
    expect(buzz(1)).toBe("");
    expect(buzz(10)).toBe("Buzz");
});

test("code", () => {
    const f = code(3)("Fizz");
    const b = code(5)("Buzz");
    expect(f(3)).toBe("Fizz");
    expect(f(5)).toBe("");
    expect(b(5)).toBe("Buzz");
    expect(b(3)).toBe("");
});

test("array of codes", () => {
    assert.deepEqual(codes(3 * 3), ["Fizz", ""]);
    assert.deepEqual(codes(5 * 2), ["", "Buzz"]);
    assert.deepEqual(codes(3 * 5), ["Fizz", "Buzz"]);
});

test("cat codes", () => {
    expect(cat(codes(1))).toBe("");
    expect(cat(codes(3))).toBe("Fizz");
    expect(cat(codes(5))).toBe("Buzz");
    expect(cat(codes(15))).toBe("FizzBuzz");
});

const empty = (s: string) => (n: number) => s.length == 0 ? n : s;

test("empty", () => {
    expect(empty("")(3)).toBe(3);
    expect(empty("a")(3)).toBe("a");
});

test("fizzbuzz", () => {
    const fizzbuzz = (n: number) => empty(cat(codes(n)))(n);

    expect(fizzbuzz(1)).toBe(1);
    expect(fizzbuzz(3)).toBe("Fizz");
    expect(fizzbuzz(4)).toBe(4);
    expect(fizzbuzz(5)).toBe("Buzz");
    expect(fizzbuzz(15)).toBe("FizzBuzz");
});
