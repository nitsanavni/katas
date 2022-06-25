import test from "ava";
import { $ } from "zx";

test("$", async (t) => {
  t.is(await $`docker `, 1);
});

