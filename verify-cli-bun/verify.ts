#!/usr/bin/env bun
import { file, spawn, stdin, write } from "bun";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const test = argv._[0];

if (argv["test-arg"]) {
    console.log(argv["test-arg"]);
    process.exit();
}

process.stdin.end();

let input = await stdin.text();

// for await (const line of console) {
//     // newline?
//     input += line;
// }

if (argv["echo"]) {
    console.log(input);
    process.exit();
}

const received = `${test}.received`;
const approved = `${test}.approved`;

let approvedText;
try {
    approvedText = await file(approved).text();
} catch {
    await write(approved, "");
}

const match = input == approvedText;

if (!match) {
    console.log("test failed");
    await write(received, input);
    spawn(["code", "-d", received, approved]);
    console.log("test failed 2");
} else {
    console.log("test passed");
}

export {};
