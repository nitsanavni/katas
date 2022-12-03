import product from "../product/product";
import test from "./test";

// "Fizz" | ""
// ["Fizz" | "", "Buzz" | ""]
// "" | "Fizz" | "Buzz" | "FizzBuzz"
// "" | "Fizz" | "Buzz" | "FizzBuzz" | number

const multipleOf: (d: number) => (n: number) => boolean = (d) => (n) =>
    n % d == 0;

test("multipleOf", () => {
    const ds = [3, 4];
    const ns = [3, 4, 8];

    return product(
        ds.map((d) => [d, multipleOf(d)]),
        ns
    )
        .map(([[d, ofFn], n]) => `of(${d})(${n}): ${ofFn(n)}`)
        .join("\n");
});

type StringLiteral<T> = T extends string
    ? string extends T
        ? never
        : T
    : never;

const code: <C>(a: {
    d: number;
    code: StringLiteral<C>;
}) => (n: number) => StringLiteral<C | ""> = ({ d, code }) => {
    const ofD = multipleOf(d);

    return (n: number) => (ofD(n) ? code : "");
};

test('"Fizz" | "" (code)', () => {
    const ns = [4, 5, 8, 9, 12];
    const codes = [
        { d: 4, code: "foo" },
        { d: 3, code: "fizz" },
    ];

    return product(codes, ns)
        .map(
            ([c, n]) =>
                `code({d:${c.d},code:"${c.code}"})(${n}): "${code(c)(n)}"`
        )
        .join("\n");
});
