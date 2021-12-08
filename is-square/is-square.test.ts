import test from "ava";

import { isSquare } from "./is-square";

test("1 is square", (t) => {
    t.is(isSquare(1), true);
})