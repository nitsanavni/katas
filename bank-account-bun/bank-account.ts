import { log } from "console";

import { table as tableWithHeaders } from "./table.js";

type Movement = { amount: number; date: string };

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

// thanks ChatGPT
// exposed for testing
export const dateFormat = (date: Date) => date.toISOString().substring(0, 10);

// exposed for testing
export const core = () => {
    // primitive?
    const movements: Movement[] = [];

    const formatStatement = () => formatStatementLines(movements);

    const move = (amount: number, date = new Date()) =>
        movements.push({ amount, date: dateFormat(date) });

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
    const { deposit, withdraw, formatStatement } = core();

    const printStatement = () => log(formatStatement());

    return {
        printStatement,
        deposit,
        withdraw,
    };
};
