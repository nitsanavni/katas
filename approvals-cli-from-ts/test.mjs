import test from "ava";
import { $, path } from "zx";
import { fileURLToPath } from "url";

test("hello world!", async (t) => {
  t.is(
    await $`python ../approvals-cli/verify.py  -t hello -r "hello world!"`
      .exitCode,
    0
  );
});
