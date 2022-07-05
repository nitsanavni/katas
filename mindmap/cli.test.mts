import test from "ava";
import { $, sleep } from "zx";

$.verbose = false;

test("runs the app", async (t) => {
  const tmpFile = (await $`mktemp`).stdout.trim();

  await $`echo "0|s|hello cli" > ${tmpFile}`;

  const cp = $`script -qfc "node index.js ${tmpFile}" /dev/null`;

  cp.stdout.on("data", (d) => t.snapshot(String(d)));

  await sleep(300);

  cp.stdin.write(" ");

  await sleep(300);
});

test("gets the arg", async (t) => {
  t.snapshot((await $`node stand-alone-cli.js some-file`).stdout);
});
