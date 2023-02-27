import readline from "readline";

if (process.stdin.isTTY) process.stdin.setRawMode(true);
readline.emitKeypressEvents(process.stdin);

process.stdin.on("keypress", (c, k) => {
    if (c == "q") process.exit();
    console.log(JSON.stringify(k));
});
