import test from "ava";
import sinon from "sinon";

import { AClass, Program } from "./event-based";

test("AClass raises event at right time", (t) => {
  const aClass = new AClass();
  const onBaz = sinon.spy();
  aClass.onBaz = onBaz;

  aClass.do();

  t.deepEqual(onBaz.firstCall.firstArg, "Hello, World!");
});

test.failing("configure", (t) => {
  const { aClass, foo } = Program.configure();

  t.deepEqual(aClass.onBaz.toString(), foo.bar.bind(foo));
});
