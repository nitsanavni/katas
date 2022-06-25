import test from "ava";
import sinon from "sinon";

import { AClass } from "./dependency-inversion";

test("AClass bars 'hello world'", (t) => {
  const bar = sinon.spy();
  const aClass = new AClass({ bar });

  aClass.do();

  t.deepEqual(bar.firstCall.firstArg, "Hello, World!");
});
