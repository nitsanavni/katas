import product from "../product/product";
import test from "./test";

// "Fizz" | ""
// ["Fizz" | "", "Buzz" | ""]
// "" | "Fizz" | "Buzz" | "FizzBuzz"
// "" | "Fizz" | "Buzz" | "FizzBuzz" | number

const s = JSON.stringify;

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

type Spec<C> = { d: number; code: StringLiteral<C> };
const arr: <C>(s: Spec<C>[]) => (n: number) => string[] = (s) => {
    const codes = s.map(code);

    return (n: number) => codes.map((c) => c(n));
};

const ns = [2, 3, 4, 12];
const specss = [
    [{ d: 3, code: "fizz" }],
    [{ d: 4, code: "foo" }],
    [
        { d: 3, code: "fizz" },
        { d: 4, code: "foo" },
    ],
    [
        { d: 4, code: "foo" },
        { d: 3, code: "fizz" },
    ],
];

test('["Fizz" | "", "Buzz" | ""]', () => {
    return product(specss, ns)
        .map(([specs, n]) => `arr(${s(specs)})(${n}):\n${s(arr(specs)(n))}`)
        .join("\n");
});

const codes: <C>(s: Spec<C>[]) => (n: number) => string = (s) => (n) =>
    arr(s)(n).join("");

test('"" | "Fizz" | "Buzz" | "FizzBuzz"', () => {
    return product(specss, ns)
        .map(([specs, n]) => `codes(${s(specs)})(${n}):\n${s(codes(specs)(n))}`)
        .join("\n");
});

const game: <C>(s: Spec<C>[]) => (n: number) => string | number =
    (s) => (n) => {
        const c = codes(s)(n);

        return c.length == 0 ? n : c;
    };

test('"" | "Fizz" | "Buzz" | "FizzBuzz" | number', () => {
    return product(specss, ns)
        .map(([specs, n]) => `game(${s(specs)})(${n}):\n${s(game(specs)(n))}`)
        .join("\n");
});

const fizzbuzz = game([
    { d: 3, code: "Fizz" },
    { d: 5, code: "Buzz" },
    { d: 7, code: "Whizz" },
    { d: 11, code: "Bang" },
]);

const range = (n: number): number[] => {
    const ret: number[] = [];

    for (let i = 0; i < n; i++) {
        ret.push(i);
    }

    return ret;
};

test("fizzbuzz", () => {
    const ns = range(100).map((x) => x + 1);

    return ns.map((n) => `${n}: ${fizzbuzz(n)}`).join("\n");
});
