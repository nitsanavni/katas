import test from "ava";
import sinon from "sinon";

import { Program } from "./rx-events";

test("all is still working in rx option", (t) => {
  const sandbox = sinon.createSandbox();
  const logSpy = sandbox.spy(console, "log");

  Program.main();

  t.deepEqual(logSpy.firstCall.firstArg, "Hello, World!");

  sandbox.restore();
});
