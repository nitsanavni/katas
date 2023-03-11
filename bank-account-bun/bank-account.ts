import { log } from "console";
import { EOL } from "os";
import { table as tableWithHeaders } from "./table.js";

type Log = typeof log;

type Deps = { log: Log; date: () => string };

type Movement = { amount: number; date: string };
type StatementLine = Movement & { balance: number };

const last = <T>(a: T[]) => a.slice(-1)[0];

const statementTable = tableWithHeaders([
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount" },
    { key: "balance", label: "Balance" },
]);

const calcBalance = (movements: Movement[]) =>
    // can use map? scan?
    // reconstructing the array seems redundant
    movements.reduce(
        (a, c) => [
            ...a,
            {
                ...c,
                balance: c.amount + (last(a)?.amount || 0),
            },
        ],
        [] as StatementLine[]
    );

const statementLines = (movements: Movement[]) =>
    calcBalance(movements).reverse();

const formatStatementLines = (movements: Movement[]) =>
    statementTable(statementLines(movements));

export const make =
    ({ log, date }: Deps) =>
    () => {
        // primitive
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

const defaultDeps: Deps = { log, date: () => new Date().toDateString() };

export const bankAccount = make(defaultDeps);
