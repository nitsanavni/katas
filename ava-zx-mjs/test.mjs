import test from "ava";
import { $, path } from "zx";
import { fileURLToPath } from "url";

test("test", async (t) => {
  const { stdout: lsOut } = await $`ls`;

  t.regex(lsOut, new RegExp(path.basename(fileURLToPath(import.meta.url))));
});
