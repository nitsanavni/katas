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

const atLine = (() => {
  let n = 0;

  const inc = () => (n = Math.min(lines.length, n + 1));
  const dec = () => (n = Math.max(0, n - 1));
  const get = () => n;

  return { inc, dec, get };
})();

const render = () => {
  cls();
  process.stdout.write(
    // splice!
    [
      ...lines.filter((_, i) => i < atLine.get()),
      "",
      ...lines.filter((_, i) => i >= atLine.get()),
    ].join(EOL)
  );
  rl.cursorTo(process.stdout, 0, atLine.get());
};

const cls = () => {
  rl.cursorTo(process.stdout, 0, 0);
  rl.clearScreenDown(process.stdout);
};

i.on("line", (line) => {
  // splice!
  lines = [
    ...lines.filter((_, i) => i < atLine.get()),
    line,
    ...lines.filter((_, i) => i >= atLine.get()),
  ];
  atLine.inc();
  render();
});

process.stdin.on("keypress", (_, key) => {
  switch (key.name) {
    case "up":
      clearLine();
      atLine.dec();
      render();
      break;
    case "down":
      clearLine();
      atLine.inc();
      render();
      break;
  }
});
