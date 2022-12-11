import { test, expect } from "bun:test";
import { inspect } from "util";

import { isMultipleOf, code, arr, codes, game } from "./fizzbuzz";

test("isMultipleOf", () => {
    expect(isMultipleOf(3)(3)).toBe(true);
    expect(isMultipleOf(3)(6)).toBe(true);
    expect(isMultipleOf(4)(4)).toBe(true);
});

test("code", () => {
    expect(code({ d: 4, code: "foo" })(4)).toBe("foo");
    expect(code({ d: 4, code: "foo" })(5)).toBe("");
    expect(code({ d: 4, code: "foo" })(8)).toBe("foo");
    expect(code({ d: 3, code: "bar" })(4)).toBe("");
    expect(code({ d: 3, code: "bar" })(6)).toBe("bar");
});

void test("arr", () => {
    expect(inspect(arr({ d: 5, code: "fooz" })(5))).toBe(inspect(["fooz"]));
    expect(inspect(arr({ d: 5, code: "fooz" })(4))).toBe(inspect([""]));

    const a = arr(
        { d: 2, code: "foo" },
        { d: 3, code: "bar" },
        { d: 5, code: "baz" }
    );

    expect(inspect(a(4))).toBe(inspect(["foo", "", ""]));
    expect(inspect(a(6))).toBe(inspect(["foo", "bar", ""]));
    expect(inspect(a(10))).toBe(inspect(["foo", "", "baz"]));
    expect(inspect(a(30))).toBe(inspect(["foo", "bar", "baz"]));
    expect(inspect(a(33))).toBe(inspect(["", "bar", ""]));
});

test("codes", () => {
    expect(codes({ d: 2, code: "foo" })(2)).toBe("foo");

    const c = codes(
        { d: 2, code: "foo" },
        { d: 3, code: "bar" },
        { d: 5, code: "baz" }
    );

    expect(c(2)).toBe("foo");
    expect(c(3)).toBe("bar");
    expect(c(5)).toBe("baz");
    expect(c(6)).toBe("foobar");
    expect(c(7)).toBe("");
});

test("game", () => {
    const g = game(
        { d: 2, code: "foo" },
        { d: 3, code: "bar" },
        { d: 5, code: "baz" }
    );

    expect(g(2)).toBe("foo");
    expect(g(7)).toBe(7);
});

const fizzbuzz = game({ d: 3, code: "Fizz" }, { d: 5, code: "Buzz" });

test("fizzbuzz", () => {
    expect(fizzbuzz(3)).toBe("Fizz");
    expect(fizzbuzz(4)).toBe(4);
    expect(fizzbuzz(5)).toBe("Buzz");
    expect(fizzbuzz(15)).toBe("FizzBuzz");
});
