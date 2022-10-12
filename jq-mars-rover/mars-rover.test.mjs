import test from "ava";
import { verify } from "./verify.mjs";

test("scaffold", async (t) => {
  await verify(t, "hello scaffold");
});
