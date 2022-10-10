import test from "ava";
import { $ } from "zx";

const verify = async ({ t, testId, received }) =>
  t.is(
    await $`python ../approvals-cli/verify.py  -t ${testId} -r ${received}`
      .exitCode,
    0
  );

test("hello world!", async (t) => {
  await verify({ t, testId: "hello", received: "hello world!" });
});
