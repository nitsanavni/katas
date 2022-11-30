#!/usr/bin/env zx

$.verbose = false;

import { inspect } from "util";

import tests from "./product-tests.json" assert { type: "json" };

const runTest = async (test) => `# ${test.name}
input:
${test.input.map(JSON.stringify).join("\n")}
output:
${(await $`jaq -n ${inspect(test.input)} | jaq -cf product.jq`).stdout}`;

const approvals = $`python -m approvaltests -t product`;

approvals.stdin;

const received = (await Promise.all(tests.map(runTest))).join("\n");

approvals.stdin.write(received);
approvals.stdin.end();

console.log();

process.exitCode = await approvals.exitCode;
