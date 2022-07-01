import { EOL } from "os";
import rl from "readline";
import { inspect } from "util";

const i = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs: string[] = [];

console.error(inspect(i.getCursorPos()));

const q = () =>
  i.question(inputs.filter((v) => /f/.test(v)).join(EOL), (answer) => {
    if (/\bq\b/.test(answer)) process.exit();

    inputs.push(answer);

    rl.cursorTo(process.stdout, 0, 0);
    rl.clearScreenDown(process.stdout);

    q();
  });

q();
