import { log } from "console";
import { EOL } from "os";
import { table } from "./table.js";

type Log = typeof log;

type Deps = { log: Log; date: () => string };

type Movement = { amount: number; date: string };
type StatementLine = Movement & { balance: number };

const last = <T>(a: T[]) => a.slice(-1)[0];

export const make =
    ({ log, date }: Deps) =>
    () => {
        const movements: Movement[] = [];

        const statementLines = () =>
            movements
                .reduce(
                    (a, c) => [
                        ...a,
                        {
                            ...c,
                            balance: c.amount + (last(a)?.amount || 0),
                        },
                    ],
                    [] as StatementLine[]
                )
                .reverse();

        const formatStatement = (): string =>
            table(statementLines(), [
                { key: "date", label: "Date" },
                { key: "amount", label: "Amount" },
                { key: "balance", label: "Balance" },
            ]);

        const printStatement = () => log(formatStatement());

        const deposit = (amount: number) =>
            movements.push({ amount, date: date() });

        const withdraw = (amount: number) => deposit(-amount);

        return { formatStatement, printStatement, deposit, withdraw };
    };

const defaultDeps: Deps = { log, date: () => new Date().toDateString() };

export const bankAccount = make(defaultDeps);
