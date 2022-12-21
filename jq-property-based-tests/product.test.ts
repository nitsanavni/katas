import { test } from "bun:test";
import { file, spawn } from "bun";
import fc from "fast-check";

// idea - to only launch jaq a few times (as opposed to hundreds of times),
// we can use a fc.property with fc.array; invoking one jaq process for multiple inputs at once

test("test jq code with fast-check", async () => {
    await spawn({
        cmd: ["jaq", "-n", `${await file("product.jq").text()} 5 | square`],
        stdout: "inherit",
    });
    fc.assert(fc.property(fc.string(), (s) => s.length < 10));
});
