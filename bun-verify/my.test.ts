import { test } from "bun:test";
import { spawnSync } from "bun";
import * as assert from "assert";

const verify = ({ received, testId }) => {
  const err = String(
    spawnSync({
      cmd: ["python", "../approvals-cli/verify.py", "-t", testId],
      stdin: new TextEncoder().encode(received),
    }).stderr
  );

  assert.deepEqual(err.length, 0, err);
};

test("echo hello", () => {
  verify({ received: "hello", testId: "hello" });
});
