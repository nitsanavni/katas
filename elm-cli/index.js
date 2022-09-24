const readline = require("readline");

var Elm = require("./main").Elm;

var main = Elm.Main.init();

main.ports.put.subscribe(function (data) {
  console.log("output: " + JSON.stringify(data));
});

if (process.stdin.isTTY) process.stdin.setRawMode(true);
readline.emitKeypressEvents(
  process.stdin,
  readline.createInterface({ input: process.stdin })
);
process.stdin.removeAllListeners("keypress");
let input = "";
process.stdin.on("keypress", (_, key) => {
  if (key.name == "return") {
    main.ports.get.send(+input);
    input = "";
    return;
  }
  input += key.name;
  console.log(input);
  if (key.name == "q") process.exit();
});
