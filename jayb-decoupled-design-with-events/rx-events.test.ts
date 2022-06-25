import test from "ava";
import sinon from "sinon";

import { Program, AClass } from "./rx-events";

test("all is still working in rx option", (t) => {
  const sandbox = sinon.createSandbox();
  const logSpy = sandbox.spy(console, "log");

  Program.main();

  t.deepEqual(logSpy.firstCall.firstArg, "Hello, Rx!");

  sandbox.restore();
});

test("we still can test aClass in isolation", (t) => {
  const aClass = new AClass();
  const bazSpy = sinon.spy();
  aClass.onBaz.subscribe(bazSpy);

  aClass.do();

  t.deepEqual(bazSpy.firstCall.firstArg, "Hello, Rx!");
});
