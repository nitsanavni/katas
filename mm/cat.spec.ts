import { expect, test } from "bun:test";
import { cat } from "./cat";

test("cat function tests", () => {
  expect(cat("Hello\nWorld", "!!!\n!!!")).toBe("Hello!!!\nWorld!!!");
  expect(cat("Hello", "!!!\n!!!")).toBe("Hello!!!\n     !!!");
  expect(cat("Hello\nWorld", "!!!")).toBe("Hello!!!\nWorld");
  expect(cat("Hello", "!!!\nWorld")).toBe("Hello!!!\n     World");
  expect(cat("\nWorld", "!!!\n!!!")).toBe("     !!!\nWorld!!!");
});
