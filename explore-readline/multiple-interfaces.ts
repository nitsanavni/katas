import rl, { Interface } from "readline";
import { inspect } from "util";

type Mode = "editor" | "keys";
let mode: Mode = "editor";

const keysInterface = (() => {
  let i: Interface;

  const create = (answer: string) => {
    i = rl.createInterface({
      input: process.stdin,
    });

    rl.emitKeypressEvents(process.stdin, i);
    process.stdin.setRawMode(true);
    process.stdin.on("keypress", (str, key) => {
      if (mode == "editor") return;
      cls();
      console.log(inspect({ str, key }));
      if (str == "q") process.exit();
      if (str == "e") setMode("editor");
      if (str == "a") process.stdout.write(answer);
    });
  };

  const close = () => {
    i?.close();
    process.stdin.setRawMode(false);
    process.stdin.removeAllListeners("keypress");
  };

  return {
    create,
    close,
  };
})();

const editorInterface = (() => {
  let i: Interface;
  let answer = "no anser yet";

  const create = () => {
    i = rl.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    i.question("?\n", (a) => {
      answer = a;
      setMode("keys");
    });
  };

  const close = () => i?.close();

  const getAnswer = () => answer;

  return { create, close, getAnswer };
})();

const setMode = (newMode: Mode) => {
  mode = newMode;

  if (mode == "keys") {
    editorInterface.close();
    keysInterface.create(editorInterface.getAnswer());
  } else {
    keysInterface.close();
    editorInterface.create();
  }
};

setMode("editor");

function cls() {
  rl.cursorTo(process.stdout, 0, 0);
  rl.clearScreenDown(process.stdout);
}
