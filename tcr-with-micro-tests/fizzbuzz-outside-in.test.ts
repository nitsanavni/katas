import { test, expect } from "bun:test";

const specs = [
    { d: 3, code: "Fizz" },
    { d: 5, code: "Buzz" },
] as const;

const fizzbuzz = (n: number) =>
    specs.reduce((acc, { d, code }) => acc + (n % d == 0 ? code : ""), "") || n;

test("1,2,3,5,6,10,15,30", () => {
    expect(fizzbuzz(1)).toBe(1);
    expect(fizzbuzz(2)).toBe(2);
    expect(fizzbuzz(3)).toBe("Fizz");
    expect(fizzbuzz(5)).toBe("Buzz");
    expect(fizzbuzz(6)).toBe("Fizz");
    expect(fizzbuzz(10)).toBe("Buzz");
    expect(fizzbuzz(15)).toBe("FizzBuzz");
    expect(fizzbuzz(30)).toBe("FizzBuzz");
});
