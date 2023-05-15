import { test } from "./approvals";

import { add } from "./string-calculator";

test("add returns 0 for an empty string", async () => {
    const result = add("");
    return `Result: ${result}`;
});

test("add returns the number when given only a single number", async () => {
    const result = add("42");
    return `Result: ${result}`;
});
