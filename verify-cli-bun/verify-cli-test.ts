#!/usr/bin/env bun

import { spawn, spawnSync } from "bun";

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

// await test('says "test passed"', () => {
//     const { stdout } = spawnSync(["./verify.ts", "test1"], {
//         stdin: new TextEncoder().encode("test 1"),
//     });
//     log(stdout!.toString());
// });

// await test("get childs with pstree", async () => {
//     const { pid } = spawn(["sh", "-c", "sleep 1"]);
//     const shPid = String(pid);

//     const { stdout: pstreeOut } = spawnSync(["pstree", "-a", shPid]);

//     log({ pstree: pstreeOut?.toString().trim().split("\n") });

//     spawnSync(["kill", shPid], { stderr: Bun.stderr });
// });

// await test('says "test failed"', () => {
//     const { stdout } = spawnSync(["./verify.ts", "test2"], {
//         stdin: new TextEncoder().encode("not test 2"),
//     });
//     log("outputs:", stdout!.toString());
// });

// await test("reads cli args: --test-arg", () => {
//     const { stdout } = spawnSync(
//         ["./verify.ts", "test3", "--test-arg", "my-value"],
//         {
//             stdin: new TextEncoder().encode("test 3"),
//         }
//     );
//     log("outputs:", stdout!.toString());
// });

// await test("reads cli args: --echo", () => {
//     const { stdout } = spawnSync(["./verify.ts", "test4", "--echo"], {
//         stdin: new TextEncoder().encode("test 4"),
//     });
//     log("outputs:", stdout!.toString());
// });

await test("different test name", () => {
    const { stdout } = spawnSync(["./verify.ts", "test5"], {
        stdin: new TextEncoder().encode("hello 5!"),
    });
    log("outputs:", stdout!.toString());
});
