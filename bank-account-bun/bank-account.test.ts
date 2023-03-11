import { describe } from "bun:test";

import { test } from "./approvals.js";

import { make } from "./bank-account.js";

const noop = () => {};
const counter =
    (n = 0) =>
    () =>
        String(n++);
const bankAccount = () =>
    make({
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
