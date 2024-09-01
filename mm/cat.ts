export const cat = (lhs: string, rhs: string): string => {
  const lhsLines = lhs.split("\n");
  const rhsLines = rhs.split("\n");

  // Find the maximum length of the lhs lines
  const maxLength = Math.max(...lhsLines.map((line) => line.length));

  // Pad the lhs lines to the maximum length
  const paddedLhsLines = lhsLines.map((line) => line.padEnd(maxLength, " "));

  // Ensure both arrays have the same number of lines by padding with empty strings
  const maxLines = Math.max(paddedLhsLines.length, rhsLines.length);

  while (paddedLhsLines.length < maxLines) {
    paddedLhsLines.push(" ".repeat(maxLength));
  }

  while (rhsLines.length < maxLines) {
    rhsLines.push("");
  }

  // Concatenate each line of lhs with the corresponding line in rhs
  let result = "";

  for (let i = 0; i < maxLines; i++) {
    const lhsPart = paddedLhsLines[i];
    const rhsPart = rhsLines[i];
    result += lhsPart + rhsPart + "\n";
  }

  return result.trimEnd(); // Remove trailing newline
};

// Function to run test cases
import { expect, test } from "bun:test";

test("cat function tests", () => {
  expect(cat("Hello\nWorld", "!!!\n!!!")).toBe("Hello!!!\nWorld!!!");
  expect(cat("Hello", "!!!\n!!!")).toBe("Hello!!!\n     !!!");
  expect(cat("Hello\nWorld", "!!!")).toBe("Hello!!!\nWorld");
  expect(cat("Hello", "!!!\nWorld")).toBe("Hello!!!\n     World");
  expect(cat("\nWorld", "!!!\n!!!")).toBe("     !!!\nWorld!!!");
});