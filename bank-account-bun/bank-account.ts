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

// exposed for testing
export const core = ({ date }: { date: () => string }) => {
    // primitive?
    const movements: Movement[] = [];

    const formatStatement = () => formatStatementLines(movements);

    const move = (amount: number) => movements.push({ amount, date: date() });

    const deposit = move;

    const withdraw = (amount: number) => move(-amount);

    return {
        formatStatement,
        deposit,
        withdraw,
    };
};

// thanks ChatGPT
// exposed for testing
export const dateFormat = (date: Date) => date.toISOString().substring(0, 10);

// this initialization / assembly is tested dynamically via the integration test
// how can we test it statically?
export const bankAccount = () => {
    const { deposit, withdraw, formatStatement } = core({
        date: () => dateFormat(new Date()),
    });

    const printStatement = () => log(formatStatement());

    return {
        printStatement,
        deposit,
        withdraw,
    };
};
