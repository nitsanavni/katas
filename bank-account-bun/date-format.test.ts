import { describe, expect, test } from "bun:test";

import { dateFormat } from "./bank-account.js";

describe("date format", () => {
    test("should be like 2012-01-14", () => {
        const date = new Date();

        expect(
            dateFormat(date)
                .split("-")
                .map((n) => +n)
        ).toEqual([date.getFullYear(), date.getMonth() + 1, date.getDate()]);

        expect(/^\d{4}-\d{2}-\d{2}$/.test(dateFormat(date))).toBe(true);
    });
});
