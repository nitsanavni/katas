import rl from "readline";

const i = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const listenToKeypress = () => {
  const int = rl.createInterface({
    input: process.stdin,
  });
  rl.emitKeypressEvents(process.stdin, int);
  process.stdin.setRawMode(true);
  process.stdin.on("keypress", (str, key) => {
    cls();
    process.stdout.write(str);
    if (str == "q") process.exit();
  });
};

i.question("who are you?\n", (whoYouAre) => {
  cls();
  console.log("writing things " + whoYouAre + " ");
  // relinquish control over stdout
  i.close();
  listenToKeypress();
});

function cls() {
  rl.cursorTo(process.stdout, 0, 0);
  rl.clearScreenDown(process.stdout);
}
