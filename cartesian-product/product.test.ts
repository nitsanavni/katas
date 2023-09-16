import { inspect } from "bun";
import { test } from "./approvals.js";

import { product } from "./product.js";

// Existing test
test("cartesian product - two input arrays", () => {
    const input = [
        [0, 1],
        [0, 1],
    ];

    return `input:
${inspect(input)}
product:
${inspect(product(...input))}`;
});

// Test with three input arrays
test("cartesian product - three input arrays", () => {
    const input = [
        [0, 1],
        [0, 1],
        [0, 1],
    ];

    return `input:
${inspect(input)}
product:
${inspect(product(...input))}`;
});

// Test with different types
test("cartesian product - different types", () => {
    const input = [
        ["A", "B"],
        [1, 2],
    ];

    return `input:
${inspect(input)}
product:
${inspect(product(...input))}`;
});

// Test with different sizes
test("cartesian product - different sizes", () => {
    const input = [
        [0, 1, 2],
        ["A", "B"],
    ] as const;

    const prod = product([0, 1, 2], ["A", "B"]);

    return `input:
${inspect(input)}
product:
${inspect(prod)}`;
});
