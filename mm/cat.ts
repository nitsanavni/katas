import stringLength from "string-length";

/**
 * Concatenates two multi-line strings, treating them as rectangular blocks.
 * It aligns the lines of both strings based on the maximum length of the lines
 * in the first string (lhs) and pads the lines of both strings to ensure they
 * have the same number of lines.
 *
 * Example:
 *
 * Input:
 * lhs:
 * Mindmaps clarify
 * thoughts and
 * ideas.
 *
 * rhs:
 * Organize
 * concepts
 * visually
 * with mindmaps.
 *
 * Result:
 * Mindmaps clarifyOrganize
 * thoughts and    concepts
 * ideas.          visually
 *                 with mindmaps.
 *
 * @param lhs - The first string to concatenate.
 * @param rhs - The second string to concatenate.
 * @returns - The concatenated multi-line string.
 */
export const cat = (lhs: string, rhs: string): string => {
  const lhsLines = lhs.split("\n");
  const rhsLines = rhs.split("\n");

  // Find the maximum length of the lhs lines
  const maxLength = Math.max(...lhsLines.map((line) => stringLength(line)));

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
