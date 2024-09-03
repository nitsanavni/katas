#!/usr/bin/env bun

import readline from "readline";
import { state } from "./state";
import { onKey } from "./onKey";
import { render } from "./renderTree";

// Get filename from CLI first positional arg
const filePath = process.argv[2];

if (!filePath) {
  console.error("Please provide a filename as the first argument.");
  process.exit(1);
}

// Listen to keyboard events
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// Ensure cursor is shown on exit, even if an error occurs
process.on("exit", () => {
  process.stdout.write("\x1B[?25h"); // Show the cursor
});

// Initial render
render(
  state.listItems(),
  state.selectedIndex(),
  state.cursorPos(),
  state.inEditMode(),
);

// Listen for keypresses
process.stdin.on("keypress", onKey(state, filePath));
