#!/usr/bin/env bun

import { spawnSync } from "bun";

const log = console.log;

const test = (name: string, cb: () => void) => {
    log("test:", name);
    cb();
};

// test that:
// it shows "test passed"
// it shows "test failed"
// it triggers the provided diff tool
// it supports passing in the test name, chnges behavior

test('says "test passed"', () => {
    const { stdout } = spawnSync(["./verify.ts", "hello"], {
        stdin: new TextEncoder().encode("hello"),
    });
    log(stdout!.toString());
});

test("", () => {});
