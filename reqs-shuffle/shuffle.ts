#!/usr/bin/env bun
import { file, write } from "bun";
import { EOL } from "os";
import yargs from "yargs";

const { r: reqsFile, b: bankFile } = await yargs(process.argv.slice(2)).argv;

const readFromPath = (path: string) => {
    const f = file(path);
    return f.size == 0 ? "" : f.text();
};

const bank = (await readFromPath(bankFile as string))
    .split(EOL)
    .filter((x) => x);
const reqs = (await readFromPath(reqsFile as string))
    .split(EOL)
    .filter((x) => x);

const sample = <T>(a: T[]) => a[Math.floor(Math.random() * a.length)];

await write(file(reqsFile as string), [sample(bank), ...reqs].join(EOL));