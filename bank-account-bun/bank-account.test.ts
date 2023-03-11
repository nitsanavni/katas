import { describe } from "bun:test";
import { test } from "./approvals.js";

import { core as makeCore } from "./bank-account.js";

const date = new Date("2023-03-13");

// this test is injecting the two offenders:
// - iso dates we inject a counter (a fake) - making it repeatable
// - iso console.log we inject noop (a stub)
// we access the statement string via an extra exposed function `formatStatement`
// (another way to do that would be to inject our own logger and use it to verify,
// but that would make it more like a mock)
// so we're testing all the logic except:
// - the integration with `console.log` and `new Date()` - tested in the integration test
// - date formatting - tested separately
const bankAccountCore = () => makeCore();

describe("bank account", () => {
    test("empty statement", () => bankAccountCore().formatStatement());

    test("one deposit", () => {
        const account = bankAccountCore();

        account.deposit(1000, date);

        return account.formatStatement();
    });

    test("multi deposits", () => {
        const account = bankAccountCore();

        account.deposit(1000, date);
        account.deposit(1001, date);
        account.deposit(1010, date);
        account.deposit(1100, date);
        account.deposit(20000, date);

        return account.formatStatement();
    });

    test("withdraws", () => {
        const account = bankAccountCore();

        account.deposit(1, date);
        account.withdraw(2, date);
        account.deposit(4, date);
        account.withdraw(8, date);
        account.deposit(16, date);
        account.withdraw(32, date);
        account.deposit(64, date);

        return account.formatStatement();
    });
});
