import { test } from "./approvals";

test("add returns 0 for an empty string", async () => {
    const result = add("");
    return `Result: ${result}`;
});
