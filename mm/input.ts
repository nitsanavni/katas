#!/usr/bin/env bun

import logUpdate from "log-update";
import readline from "readline";

// Initial input field setup
let inputField = ""; // Start with an empty input
let cursorPosition = 0; // Initial cursor position

// Render the input field
function renderInputField() {
  const beforeCursor = inputField.slice(0, cursorPosition);
  const cursorChar = inputField[cursorPosition] || " "; // If no char, use space
  const afterCursor = inputField.slice(cursorPosition + 1);
  
  // Set background color to blue for the character under the cursor
  const coloredCursorChar = `\x1b[47m\x1b[30m${cursorChar}\x1b[0m`; // White background with black text
  
  logUpdate(`\n${beforeCursor}${coloredCursorChar}${afterCursor}`);
}

// Listen to keyboard events
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

function exitProgram() {
  logUpdate.clear();
  process.stdout.write("\x1B[?25h"); // Show the cursor
  console.log("Exiting...");
  process.exit();
}

process.stdin.on("keypress", (str, key) => {
  if (key.name === "q") {
    exitProgram();
  } else if (key.name === "left") {
    cursorPosition = Math.max(0, cursorPosition - 1); // Move cursor left
  } else if (key.name === "right") {
    cursorPosition = Math.min(inputField.length, cursorPosition + 1); // Move cursor right
  } else if (key.name === "backspace") {
    if (cursorPosition > 0) {
      inputField =
        inputField.slice(0, cursorPosition - 1) + inputField.slice(cursorPosition);
      cursorPosition--; // Move cursor back after deletion
    }
  } else if (key.sequence && !key.ctrl && !key.meta) {
    inputField =
      inputField.slice(0, cursorPosition) +
      str +
      inputField.slice(cursorPosition);
    cursorPosition++; // Move cursor forward after insertion
  }
  renderInputField();
});

// Ensure cursor is shown on exit, even if an error occurs
process.on("exit", () => {
  process.stdout.write("\x1B[?25h"); // Show the cursor
});

// Initial render
renderInputField();
