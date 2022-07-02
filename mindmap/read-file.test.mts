import test from "ava";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { $ } from "zx";
import { OutlineNode } from "./outline-node.js";

import { makeReadFile } from "./read-file.js";

$.verbose = false;

test("creates file if not exists - with empty outline", async (t) => {
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

test("reads file", async (t) => {
  const readfile = makeReadFile();

  const file = (await $`mktemp`).stdout.trim();

  await $`echo ${"0|hello world!"} > ${file}`;

  const fileSubject = new BehaviorSubject(file);

  readfile.read(fileSubject);

  const expectedOutline: OutlineNode[] = [
    { body: "hello world!", indentation: 0 },
  ];

  t.deepEqual(await firstValueFrom(readfile.initialNodes()), expectedOutline);
});
