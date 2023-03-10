import { test } from "bun:test";

import { approval } from "./approvals.js";
import { driver } from "./bank-account-driver.js";

test("empty statement", async () => {
    await approval("empty-statement").verify(await driver().printStatement());
});
