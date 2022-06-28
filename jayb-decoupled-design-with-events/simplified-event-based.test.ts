import test from "ava";
import sinon from "sinon";

import { AClass, Program } from "./simplified-event-based";

test("AClass raises event at right time", (t) => {
  const aClass = new AClass();
  const onBaz = sinon.spy();
  aClass.onBaz = onBaz;

  aClass.do();

  t.deepEqual(onBaz.firstCall.firstArg, "Hello, World!");
});

test("configure", (t) => {
  const { aClass, bar } = Program.configure();

  t.is(aClass.onBaz, bar);
});
