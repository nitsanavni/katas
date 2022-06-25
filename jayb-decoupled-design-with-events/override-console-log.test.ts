import test from "ava";
import sinon from "sinon";

import { Program } from "./original-program";

test("program should log 'hello world' to console", (t) => {
  const sandbox = sinon.createSandbox();
  const logSpy = sandbox.spy(console, "log");

  Program.main();

  t.deepEqual(logSpy.args, [["Hello, World!"]]);

  sandbox.restore();
});
