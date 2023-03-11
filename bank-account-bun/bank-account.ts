import { log } from "console";

import { table as tableWithHeaders } from "./table.js";

type Deps = { log: typeof log; date: () => string };

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

export const make =
    ({ log, date }: Deps) =>
    () => {
        // primitive?
        const movements: Movement[] = [];

        const formatStatement = () => formatStatementLines(movements);

        const printStatement = () => log(formatStatement());

        const move = (amount: number) =>
            movements.push({ amount, date: date() });

        const deposit = move;

        const withdraw = (amount: number) => move(-amount);

        return {
            printStatement,
            deposit,
            withdraw,
            // exposed for testing
            formatStatement,
        };
    };

const defaultDeps: Deps = {
    log,
    // thanks ChatGPT
    date: () => new Date().toISOString().substring(0, 10),
};

export const bankAccount = make(defaultDeps);
