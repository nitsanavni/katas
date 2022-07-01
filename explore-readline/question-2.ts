import rl from "readline";

const i = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs: string[] = [];

i.question("who are you?", (whoYouAre) => {
  cls();
  i.question("When are you?", (whenYouAre) => {
    cls();
    // i.write("writing things " + whoYouAre + " " + whenYouAre + "\n");
    console.log("writing things " + whoYouAre + " " + whenYouAre);
    process.exit();
  });
});

function cls() {
  rl.cursorTo(process.stdout, 0, 0);
  rl.clearScreenDown(process.stdout);
}
