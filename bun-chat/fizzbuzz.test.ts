import { chatTest } from "./chat-test.ts";

import { test } from "bun:test";

test("bab", () => {});

const fizzbuzz = (n: number) =>
    n % 15 == 0 ? "gongbang" : n % 5 == 0 ? "bang" : n % 3 == 0 ? "gong" : n;

await chatTest(
    `
    sut(i) should return i for all inputs
    except if i is a multiple of 3, then return gong
    except if i is a multiple of 5, then return bang
    expect when it's both, then return gongbang

    ${Array.from({ length: 20 }, (_, i) => i + 1)
        .map((i) => `sut(${i}) result: \`${fizzbuzz(i)}\``)
        .join("\n")}
    `
);
