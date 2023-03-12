import { log } from "console";

import { table as tableWithHeaders } from "./table.js";

type Movement = { amount: number; date: string };

// thanks ChatGPT
// exposed for testing
export const dateFormat = (date: Date) => date.toISOString().substring(0, 10);

export const calculations = () => {
    const statementTable = tableWithHeaders([
        { key: "date", label: "Date" },
        { key: "amount", label: "Amount" },
        { key: "balance", label: "Balance" },
    ]);

    const calcBalance = (movements: Movement[]) =>
        movements.map(
            (
                (balance = 0) =>
                (movement) => ({
                    ...movement,
                    balance: (balance += movement.amount),
                })
            )()
        );

    const statementLines = (movements: Movement[]) =>
        calcBalance(movements).reverse();

    const formatStatementLines = (movements: Movement[]) =>
        statementTable(statementLines(movements));

    const makeMovement = (amount: number, date: Date): Movement => ({
        amount,
        date: dateFormat(date),
    });

    return { formatStatementLines, makeMovement };
};

const state = <T>() => {
    const movements: T[] = [];

    const add = (movement: T): void => {
        movements.push(movement);
    };

    const clone = () => movements.map((x) => x);

    const get = clone;

    return { add, get };
};

// exposed for testing
// can decouple state from calc even further
export const statefulCore = () => {
    const { formatStatementLines, makeMovement } = calculations();
    const { add, get } = state<Movement>();

    const formatStatement = () => formatStatementLines(get());

    // `new Date()` should move out
    const move = (amount: number, date = new Date()) =>
        add(makeMovement(amount, date));

    const deposit = move;

    const withdraw = (amount: number, date = new Date()) => move(-amount, date);

    return {
        formatStatement,
        deposit,
        withdraw,
    };
};

// this initialization / assembly is tested dynamically via the integration test
// how can we test it statically?
export const bankAccount = () => {
    const { deposit, withdraw, formatStatement } = statefulCore();

    const printStatement = () => log(formatStatement());

    return {
        printStatement,
        deposit,
        withdraw,
    };
};
