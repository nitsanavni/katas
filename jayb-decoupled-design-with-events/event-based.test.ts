import test from "ava";
import sinon from "sinon";

import { AClass, Program } from "./event-based";

test("AClass raises event at right time", (t) => {
  const aClass = new AClass();
  const onBaz = sinon.spy();
  aClass.onBaz.add(onBaz);

  aClass.do();

  t.deepEqual(onBaz.firstCall.firstArg, "Hello, World!");
});

test("configure", (t) => {
  const { aClass, bar } = Program.configure();

  t.deepEqual(aClass.onBaz.getInvocationList(), [bar]);
});
