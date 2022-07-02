import test from "ava";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { $ } from "zx";
import { OutlineNode } from "./outline-node.js";

import { makeReadFile } from "./read-file.js";

$.verbose = false;

test("creates file if not exists - with empty outline", async (t) => {
  t.plan(2);

  const readfile = makeReadFile();

  const { stdout: tempDir } = await $`mktemp -d`;

  const file = `${tempDir.trim()}/non-existing-file`;
  const fileSubject = new BehaviorSubject(file);

  readfile.read(fileSubject);

  const emptyOutline: OutlineNode[] = [
    { body: "", indentation: 0, selected: true },
  ];

  t.deepEqual(await firstValueFrom(readfile.initialNodes()), emptyOutline);

  t.is(await $`ls ${file}`.exitCode, 0);
});
