import { spawn } from "bun";
import yargs from "yargs";

import { bankAccount } from "./bank-account.js";

if (import.meta.url === `file://${process.argv[1]}`) {
    const seq: number[] = JSON.parse(
        (await yargs(process.argv.slice(2)).argv)._[0] as string
    );

    const account = bankAccount();
    seq.forEach((amount) => account.deposit(amount));
    account.printStatement();
}

export const driver = (movementSequence: number[]) =>
    new Response(
        spawn({
            cmd: [
                "bun",
                "bank-account.driver.ts",
                JSON.stringify(movementSequence),
            ],
        }).stdout
    ).text();
