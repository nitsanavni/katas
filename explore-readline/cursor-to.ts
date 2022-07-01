import rl from "readline";

const i = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.cursorTo(process.stdout, 0, 0);
rl.clearScreenDown(process.stdout);
i.setPrompt(`a
b: 
c`);

i.prompt();

i.question(
  `a
b: 
c`,
  (answer) => (
    rl.cursorTo(process.stdout, 0, 0),
    rl.clearScreenDown(process.stdout),
    i.setPrompt(`a
b: ${answer} ✅
c`),
    i.prompt()
  )
);

rl.cursorTo(process.stdout, 3, 1);
