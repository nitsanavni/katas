import { inspect, sleep } from "bun";
import readline from "readline";
import logUpdate from "log-update";

if (process.stdin.isTTY) process.stdin.setRawMode(true);
const rl = readline.createInterface(process.stdin);
readline.emitKeypressEvents(process.stdin, rl);

process.stdin.on("keypress", (c, k) => {
    if (c === "q") process.exit();
    console.log(inspect(k));
});
