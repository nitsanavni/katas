import test from "ava";
import { inspect } from "util";

import { isSquare, build, isKnown } from "./is-square";

test("1 is square", (t) => {
    t.is(isSquare(1), true);
})

test("10000 is square", (t) => {
    t.is(isSquare(10000), true);
})

test("10000 * 10000 is square", (t) => {
    t.is(isSquare(10000 * 10000), true);
})

test("is known", (t) => {
    const squares = build({ squares: [], upTo: 10 });

    [
        { n: -4, expected: false },
        { n: -3, expected: false },
        { n: -2, expected: false },
        { n: -1, expected: false },
        { n: 0, expected: true },
        { n: 1, expected: true },
        { n: 2, expected: false },
        { n: 3, expected: false },
        { n: 4, expected: true },
        { n: 5, expected: false },
        { n: 6, expected: false },
        { n: 7, expected: false },
        { n: 8, expected: false },
        { n: 9, expected: true },
        { n: 10, expected: false },
        { n: 11, expected: false },
        { n: 12, expected: false },
        { n: 13, expected: false },
        { n: 14, expected: false },
        { n: 15, expected: false },
        { n: 16, expected: false },
        { n: 17, expected: false },
    ].forEach(({ n, expected }) => t.is(isKnown({ squares, n }), expected, inspect({n,expected})))
})

test("squares builder", (t) => {
    t.deepEqual(build({ squares: [{ root: 0, square: 0 }], upTo: 0 }), [{ root: 0, square: 0 }]);
    t.deepEqual(build({ squares: [{ root: 0, square: 0 }], upTo: -1 }), [{ root: 0, square: 0 }]);
    t.deepEqual(build({ squares: [], upTo: 0 }), [{ root: 0, square: 0 }]);
    t.deepEqual(build({ squares: build({ squares: [], upTo: 100 }), upTo: 1000 }), build({ squares: [], upTo: 1000 }));
})