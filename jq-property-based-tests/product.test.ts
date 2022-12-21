import { test } from "bun:test";
import { file, readableStreamToText, spawn } from "bun";
import fc from "fast-check";

// idea - to only launch jaq a few times (as opposed to hundreds of times),
// we can use a fc.property with fc.array; invoking one jaq process for multiple inputs at once

test("test jq code with fast-check", async () => {
    const invokeJq = async (input: string, cmd: string) =>
        readableStreamToText(
            (
                await spawn({
                    cmd: [
                        "sh",
                        "-c",
                        `echo '${input}' | jaq '${await file(
                            "product.jq"
                        ).text()} ${cmd}'`,
                    ],
                })
            ).stdout!
        );

    const inputArbitrary = fc.array(
        fc.constantFrom(["a", "b", "c"], [1, 2, 3], ["x", "y", "z"], [0, 1])
    );

    const inputAndOutputArrayLengthsAlignProperty = fc.asyncProperty(
        inputArbitrary,
        async (s) =>
            /true/.test(
                await invokeJq(
                    JSON.stringify(s),
                    "[(.|length),(product|.[0]|length)] | .[0]==.[1]"
                )
            )
    );

    await fc.assert(inputAndOutputArrayLengthsAlignProperty);
});
