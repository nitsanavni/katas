import { test } from "./approvals.js";

import { make } from "./bank-account.js";

const noop = () => {};
const counter =
    (n = 0) =>
    () =>
        String(n++);
const bankAccount = make({
    log: noop,
    date: counter(),
});

test("empty statement", async ({ verify }) => {
    await verify(bankAccount().formatStatement());
});

test("one deposit", async ({ verify }) => {
    const account = bankAccount();

    account.deposit(1000);

    await verify(account.formatStatement());
});

test("multi deposits", async ({ verify }) => {
    const account = bankAccount();

    account.deposit(1000);
    account.deposit(1001);
    account.deposit(1010);
    account.deposit(1100);
    account.deposit(20000);

    await verify(account.formatStatement());
});
