import test from "ava";
import { $ } from "zx";

$.verbose = false;

test("gets the arg", async (t) => {
  t.snapshot((await $`node stand-alone-cli.js some-file`).stdout);
});
