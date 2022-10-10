import test from "ava";
import { $ } from "zx";
import _ from "lodash";

const verify = async ({ t, testId, received }) =>
  t.is(
    await $`python ../approvals-cli/verify.py  -t ${testId} -r ${received}`
      .exitCode,
    0
  );

test("hello world!", async (t) => {
  await verify({ t, testId: "hello", received: "hello world!" });
});

const fizzbuzz = (n) => n;

test("fizzbuzz 1-100", async (t) => {
  await verify({
    t,
    testId: "fizzbuzz-1-100",
    received: _.range(1, 101).map(fizzbuzz).join("\n"),
  });
});
