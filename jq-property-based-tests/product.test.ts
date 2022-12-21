import { file, spawn } from "bun";
import { test, expect } from "bun:test";
import fc from "fast-check";

test("test the fast-check", async () => {
    await spawn({
        cmd: ["jaq", "-n", `${await file("product.jq").text()} 5 | square`],
        stdout: "inherit",
    });
    fc.assert(fc.property(fc.string(), (s) => s.length < 10));
});
