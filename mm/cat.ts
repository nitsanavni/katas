const cat = (lhs: string, rhs: string): string => {
  const lhsLines = lhs.split("\n");
  const rhsLines = rhs.split("\n");
  
  // Find the maximum length of the lhs lines
  const maxLength = Math.max(...lhsLines.map(line => line.length));

  // Pad the lhs lines to the maximum length
  const paddedLhsLines = lhsLines.map(line => line.padEnd(maxLength, ' '));

  // Concatenate each line of lhs with the corresponding line in rhs
  const maxLines = Math.max(paddedLhsLines.length, rhsLines.length);
  let result = '';

  for (let i = 0; i < maxLines; i++) {
    const lhsPart = paddedLhsLines[i] || ''; // handle case where lhs is shorter
    const rhsPart = rhsLines[i] || ''; // handle case where rhs is shorter
    result += lhsPart + rhsPart + '\n';
  }

  return result.trim(); // Remove trailing newline
};

// Test cases
if (require.main === module) {
  console.log(cat("Hello\nWorld", "!!!\n!!!")); // Expected output: "Hello!!!\nWorld!!!"
  console.log(cat("Line1", "Line2")); // Expected output: "Line1Line2"
  console.log(cat("Short", "A long line")); // Expected output: "ShortA long line"
}
