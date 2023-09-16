#!/usr/bin/env bun
import { file, write } from "bun";
import { EOL } from "os";
import yargs from "yargs";

// example:
// ./shuffle.ts -r fizzbuzz.reqs -b fizzbuzz.bank

const { r: reqsFile, b: bankFile } = await yargs(process.argv.slice(2)).argv;

const readFromPath = (path: string) => {
    const f = file(path);
    return f.size == 0 ? "" : f.text();
};

const lines = async (filePath: string) =>
    (await readFromPath(filePath)).split(EOL).filter((x) => x);

const bank = await lines(bankFile as string);
const reqs = await lines(reqsFile as string);

const sample = <T>(a: T[]) => a[Math.floor(Math.random() * a.length)];

// TODO - avoid dups in reqs

await write(file(reqsFile as string), [sample(bank), ...reqs].join(EOL));
