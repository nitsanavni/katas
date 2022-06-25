import test from "ava";
import sinon from "sinon";

import { Program, container, AClass } from "./dependency-injection";

test("program still logs 'hello world'", (t) => {
  const sandbox = sinon.createSandbox();
  const logSpy = sandbox.spy(console, "log");

  Program.main();

  t.deepEqual(logSpy.args, [["Hello, World!"]]);

  sandbox.restore();
});

test("now we can **inject** a mock for foo", (t) => {
  const bar = sinon.spy();
  const foo = { bar };
  container.rebind("foo").toConstantValue(foo);
  const aClass = container.get<AClass>("aClass");

  aClass.do();

  t.deepEqual(bar.firstCall.firstArg, "Hello, World!");
});
