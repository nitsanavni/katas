#!/usr/bin/env bun

import { sleepSync, spawn, spawnSync } from "bun";

const log = console.log;

const test = async (name: string, cb: () => void) => {
    log("test:", name);
    await cb();
    log("");
};

// test that:
// it shows "test passed"
// it shows "test failed"
// it triggers the provided diff tool
// it supports passing in the test name, chnges behavior

await test('says "test passed"', () => {
    const { stdout } = spawnSync(["./verify.ts", "hello"], {
        stdin: new TextEncoder().encode("hello"),
    });
    log(stdout!.toString());
});

await test("get childs with pstree", async () => {
    const { pid } = spawn(["sh", "-c", "sleep 1"]);
    const shPid = String(pid);

    const { stdout: pstreeOut } = spawnSync(["pstree", "-a", shPid]);

    log({ pstree: pstreeOut?.toString().trim().split("\n") });

    spawnSync(["kill", shPid], { stderr: Bun.stderr });
});

await test('says "test failed"', () => {
    const { stdout } = spawnSync(["./verify.ts", "hello"], {
        stdin: new TextEncoder().encode("not hello"),
    });
    log("outputs:", stdout!.toString());
});

await test("reads cli args: --test-arg", () => {
    const { stdout } = spawnSync(
        ["./verify.ts", "hello", "--test-arg", "my-value"],
        {
            stdin: new TextEncoder().encode("hello"),
        }
    );
    log("outputs:", stdout!.toString());
});
