#!/usr/bin/env bun

import readline from "readline";
// import { render } from "./render"; // Import the render function
import { state } from "./state"; // Import the state management
import { onKey } from "./onKey"; // Import the onKey function
import { render } from "./renderTree";

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
process.stdin.on("keypress", onKey(state));
