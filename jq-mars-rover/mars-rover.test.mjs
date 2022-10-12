import test from "ava";
import { $ } from "zx";

import { verify } from "./verify.mjs";

// Test Input:
// 5 5
// 1 2 N
// LMLMLMLMM
// 3 3 E
// MMRMMRMRRM
// Expected Output:
// 1 3 N
// 5 1 E

test("mars rover - example from kata description", async (t) => {
  await verify(t, (await $`jaq -n '3'`).stdout);
});
