import { test } from "./approvals.js";

import { table } from "./table.js";

test("table", () =>
    table([
        { key: "b", label: "BBB" },
        { key: "a", label: "AAA" },
    ])([
        { a: 1, b: 2 },
        { a: 3, b: 4 },
        { a: 5, b: 6666 },
    ]));
