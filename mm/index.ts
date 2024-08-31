#!/usr/bin/env bun

import logUpdate from "log-update";
import readline from "readline";

// Create a 10x10 grid
const gridSize = 10;
let x = 0,
  y = 0; // Initial position of the square

// Render the grid
function renderGrid() {
  let grid = "";
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (i === y && j === x) {
        grid += "[]"; // Square
      } else {
        grid += " ."; // Empty space
      }
    }
    grid += "\n";
  }
  logUpdate(`\n${grid}`);
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
  } else if (key.name === "up") {
    y = (y - 1 + gridSize) % gridSize; // Wrap around when going up
  } else if (key.name === "down") {
    y = (y + 1) % gridSize; // Wrap around when going down
  } else if (key.name === "left") {
    x = (x - 1 + gridSize) % gridSize; // Wrap around when going left
  } else if (key.name === "right") {
    x = (x + 1) % gridSize; // Wrap around when going right
  }
  renderGrid();
});

// Ensure cursor is shown on exit, even if an error occurs
process.on("exit", () => {
  process.stdout.write("\x1B[?25h"); // Show the cursor
});

// Initial render
renderGrid();
