import rl from "readline";
import { inspect } from "util";

const i = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (): string => {
  const { line } = i;
  (i as { line: string }).line = "";

  return line;
};

i.on("line", (line) => console.log(inspect({ line, i: i.line })));

const tabKeyToEndLineToo = () =>
  // keypress events are automatically available when using readline.createInterface on a TTY
  process.stdin.on("keypress", (str, key) => {
    if (key.name == "tab") {
      i.emit("line", clearLine());
    }
  });

tabKeyToEndLineToo();
