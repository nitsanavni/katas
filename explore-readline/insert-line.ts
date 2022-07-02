import { EOL } from "os";
import rl from "readline";

const i = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (): string => {
  const { line } = i;
  (i as { line: string }).line = "";

  return line;
};

let lines: string[] = [];
let atLine: number = 0;

const render = () => {
  cls();
  process.stdout.write(
    [
      ...lines.filter((v, i) => i < atLine),
      "",
      ...lines.filter((v, i) => i >= atLine),
    ].join(EOL)
  );
  rl.cursorTo(process.stdout, 0, atLine);
};

const cls = () => {
  rl.cursorTo(process.stdout, 0, 0);
  rl.clearScreenDown(process.stdout);
};

i.on("line", (line) => {
  atLine++;
  lines = [
    ...lines.filter((_, i) => i < atLine - 1),
    line,
    ...lines.filter((_, i) => i >= atLine - 1),
  ];
  render();
});

process.stdin.on("keypress", (str, key) => {
  switch (key.name) {
    case "tab":
      i.emit("line", clearLine());
      break;
    case "up":
      clearLine();
      atLine = Math.max(0, atLine - 1);
      render();
      break;
    case "down":
      clearLine();
      atLine++;
      // extract cap / Math.min
      if (atLine > lines.length) {
        atLine = lines.length;
      }
      render();
      break;
  }
});
