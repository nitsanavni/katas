import { test, ExecutableCommand } from "./approvals";

import { spawn } from "bun";

test("string approval", () => "string result!");

const cliCommand = (cmd: string[]): ExecutableCommand => ({
    command: () => JSON.stringify(cmd),
    execute: async (command) =>
        `command:
${command}

result:
${await new Response(spawn({ cmd: JSON.parse(command) }).stdout).text()}`,
});

test("command approval: cli command: ls", () =>
    cliCommand(["sh", "-c", "sleep .1 && ls -al"]));

test("command approval: cli command: date", () =>
    cliCommand(["sh", "-c", "sleep .15 && date"]));
