import { describe } from "bun:test";
import { test } from "./approvals.js";

import { dateFormat } from "./bank-account.js";

describe("date format", () => {
    test("verify 2012-01-14 format", () => dateFormat(new Date("2012-01-14")));
});
