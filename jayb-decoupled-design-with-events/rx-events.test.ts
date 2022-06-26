import test from "ava";
import sinon from "sinon";

import { Program, AClass } from "./rx-events";

test("all is still working nicely together", (t) => {
  const sandbox = sinon.createSandbox();
  const logSpy = sandbox.spy(console, "log");

  Program.main();

  t.deepEqual(logSpy.firstCall.firstArg, "Hello, Rx!");

  sandbox.restore();
});

test("we can still test aClass in isolation - Foo class is not involved", (t) => {
  const aClass = new AClass();
  const bazSpy = sinon.spy();
  aClass.onBaz.subscribe(bazSpy);

  aClass.do();

  t.deepEqual(bazSpy.firstCall.firstArg, "Hello, Rx!");
});

test("tap into the rx channel to inspect events coming from dispatcher", (t) => {
  const { aClass, bazChannel } = Program.configure();

  const bazSpy = sinon.spy();
  // tap directly into the channel
  // note: this doesn't prevent the real Foo from reacting to the event too
  bazChannel.subscribe(bazSpy);

  aClass.do();

  t.deepEqual(bazSpy.firstCall.firstArg, "Hello, Rx!");
});

test("drive the subscriber (Foo) via the rx channel", (t) => {
  const sandbox = sinon.createSandbox();
  const logSpy = sandbox.spy(console, "log");

  const { bazChannel } = Program.configure();

  bazChannel.next("Hello, Rx test!");

  t.deepEqual(logSpy.firstCall.firstArg, "Hello, Rx test!");

  sandbox.restore();
});

test.todo(
  "test configuration - it's difficult to track subscriptions - ideas?"
);
