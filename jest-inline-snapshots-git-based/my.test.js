const { over } = require("lodash");

const part =
    ([divisor, code]) =>
    (n) =>
        n % divisor == 0 ? code : "";

specs = [
    [3, "Fizz"],
    [5, "Buzz"],
];

const parts = specs.map(part);

const fizzbuzz = (n) => over(parts)(n).join("") || n;

test("hello", () => {
    expect(range(15).map(fizzbuzz)).toMatchInlineSnapshot(`
[
  1,
  2,
  "Fizz",
  4,
  "Buzz",
  "Fizz",
  7,
  8,
  "Fizz",
  "Buzz",
  11,
  "Fizz",
  13,
  14,
  "FizzBuzz",
]
`);
});

function range(e) {
    return Array.from({ length: e }, (_, i) => i + 1);
}
