import { execaNode } from "execa";
import { writeFile } from "fs/promises";

const call = (stdin: string, args: string[]) => {
    const child = execaNode("./verify.js", args);
    child.stdin?.write(stdin);
    child.stdin?.end();

    return child;
};

const log = console.log;

const test = async (name: string, cb: () => void) => {
    log("test:", name);
    await cb();
    log("");
};

await test("shows argv", async () => {
    const { stdout } = await call("", ["--argv"]);
    log("stdout:", stdout);
});

await test("shows paths", async () => {
    const { stdout } = await call("", ["my test", "--paths"]);
    log("stdout:", stdout);
});

await test("compares between input and approved - match", async () => {
    const theText = "yes, it's a match!";
    await writeFile("test3.approved", theText);
    const { stdout } = await call(theText, ["test3"]);
    log("stdout:", stdout);
});

await test("you're no match for me!", async () => {
    await writeFile("test4.approved", "match?");
    const { stdout } = await call("nope", ["test4", "--match"]);
    log("stdout:", stdout);
});

await test("triggers the diff tool", async () => {
    await writeFile("test5.approved", "match?");
    const { stdout } = await call("nope" + process.pid, ["test5"]);
    log("stdout:", stdout);
});

await test("chooses diff tool", async () => {
    await writeFile("test6.approved", "match?");
    const { stdout } = await call("nope" + process.pid, [
        "test6",
        "--diff",
        "echo",
    ]);
    log("stdout:", stdout);
});

await test("chooses diff tool: diff", async () => {
    await writeFile("test7.approved", "match?");
    const { stdout } = await call("nope" + process.pid, [
        "test7",
        "--diff",
        "diff",
    ]);
    log("stdout:", stdout);
});

await test("chooses diff tool: git diff", async () => {
    await writeFile("test7.approved", "match?");
    const { stdout } = await call("nope" + process.pid, [
        "test7",
        "--diff",
        "git diff --no-index",
    ]);
    log("stdout:", stdout);
});
