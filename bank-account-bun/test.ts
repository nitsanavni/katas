import { spawn } from "bun";
import { log } from "console";
import yargs from "yargs";
import { approval } from "./approvals.js";

const [test] = (await yargs(process.argv.slice(2)).argv)._;

log({ test });
await approval(test as string).verify(
    await new Response(spawn({ cmd: ["bun", test as string] }).stdout).text()
);
