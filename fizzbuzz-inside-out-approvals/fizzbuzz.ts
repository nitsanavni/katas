import { inspect } from "util";

import product from "../product/product";

type Test = (name: string, printer: () => any) => void;

const test: Test = (name, printer) => {
    console.log(`${name}`);
    console.log(`${printer()}`);
    console.log("");
};

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
