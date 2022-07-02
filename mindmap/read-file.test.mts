import test from "ava";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { $ } from "zx";

import { makeReadFile } from "./read-file.js";

$.verbose = false;

test("creates file if not exists", async (t) => {
  t.plan(1);

  const readfile = makeReadFile();

  const { stdout: tempDir } = await $`mktemp -d`;

  const file = `${tempDir.trim()}/non-existing-file`;
  const fileSubject = new BehaviorSubject(file);

  readfile.read(fileSubject);
  await firstValueFrom(readfile.initialNodes());

  t.is(await $`ls ${file}`.exitCode, 0);
});
