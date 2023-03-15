import { expect, test } from "bun:test";

import { makeSample } from "./sample.js";

test("sample", () => {
    expect(makeSample(() => 0.3)([0.31])).toEqual(0);
    expect(makeSample(() => 0.3)([0.29])).toEqual(1);
    expect(makeSample(() => 0.9)([0.29, 0.2])).toEqual(2);
});
