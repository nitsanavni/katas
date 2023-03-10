import { expect, test } from "bun:test";

import { test as approvalTest } from "./approvals.js";

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

test.skip("just a test", () => {});

approvalTest("empty statement", async ({ verify }) => {
    await verify(bankAccount().formatStatement());
});

approvalTest("one deposit", async ({ verify }) => {
    const account = bankAccount();

    account.deposit(1000);

    await verify(account.formatStatement());
});

approvalTest("multi deposits", async ({ verify }) => {
    const account = bankAccount();

    account.deposit(1000);
    account.deposit(1001);
    account.deposit(1010);
    account.deposit(1100);
    account.deposit(20000);

    await verify(account.formatStatement());
});

approvalTest("withdraws", async ({ verify }) => {
    const account = bankAccount();

    account.deposit(1);
    account.withdraw(2);
    account.deposit(4);
    account.withdraw(8);
    account.deposit(16);
    account.withdraw(32);
    account.deposit(64);

    await verify(account.formatStatement());
});
