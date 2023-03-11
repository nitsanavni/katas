import { describe } from "bun:test";
import { test } from "./approvals.js";
import { driver } from "./bank-account.driver.js";

const dateRe = /\d{4}-\d{2}-\d{2}/g;

// here's how we deal with the implicit inputs and outputs:
// - input: dates: we use a scrubber to make the test repeatable
// - output: stdout: we run the app as a child process and verify its stdout
describe("integration test (real dates, and stdout)", () => {
    test("integration", async () =>
        (await driver([1000, 100, 10, 1, -2, -30, -400, -5000])).replaceAll(
            dateRe,
            "<scrubbed>"
        ));
});
