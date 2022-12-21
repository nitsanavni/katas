import { test, expect } from "bun:test";
import jq from "./jq";

test("let's run some jq", async () => {
    const square = jq`. * .`;
    const factorial = jq`[range(.) | . + 1] | reduce .[] as $x (1; . * $x)`;
    const product = jq`[reduce .[] as $array (null; (. // []) + ($array[] | [.])) // empty]`;

    expect(await square(8)).toEqual(64);
    expect(await factorial(8)).toEqual(40320);
    expect(await factorial(4)).toEqual(24);
    expect(
        await product([
            [0, 1],
            [0, 1],
            [0, 1],
        ])
    ).toEqual([
        [0, 0, 0],
        [0, 0, 1],
        [0, 1, 0],
        [0, 1, 1],
        [1, 0, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 1, 1],
    ]);
});
