import { describe } from "bun:test";
import { test } from "./approvals.js";

import { make as makeBankAccount } from "./bank-account.js";

const noop = () => {};
const counter =
    (n = 0) =>
    () =>
        String(n++);

// this test is injecting the two offenders:
// - iso dates we inject a counter (a fake) - making it repeatable
// - iso console.log we inject noop (a stub)
// we access the statement string via an extra exposed function `formatStatement`
// (another way to do that would be to inject our own logger and use it to verify,
// but that would make it more like a mock)
// so we're testing all the logic except:
// - the integration with `console.log` and `new Date()` - tested in the integration test
// - date formatting - tested separately
const bankAccount = () =>
    makeBankAccount({
        log: noop,
        date: counter(),
    })();

describe("bank account", () => {
    test("empty statement", () => bankAccount().formatStatement());

    test("one deposit", () => {
        const account = bankAccount();

        account.deposit(1000);

        return account.formatStatement();
    });

    test("multi deposits", () => {
        const account = bankAccount();

        account.deposit(1000);
        account.deposit(1001);
        account.deposit(1010);
        account.deposit(1100);
        account.deposit(20000);

        return account.formatStatement();
    });

    test("withdraws", () => {
        const account = bankAccount();

        account.deposit(1);
        account.withdraw(2);
        account.deposit(4);
        account.withdraw(8);
        account.deposit(16);
        account.withdraw(32);
        account.deposit(64);

        return account.formatStatement();
    });
});
