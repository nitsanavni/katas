#!/usr/bin/env bun

import readline from "readline";
import { render } from "./render"; // Import the render function
import { state } from "./state"; // Import the state management

// Listen to keyboard events
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

function exitProgram() {
  process.stdout.write("\x1B[?25h"); // Show the cursor
  console.log("Exiting...");
  process.exit();
}

const onKey = (state) => (str, key) => {
  if (state.inEditMode()) {
    if (key.name === "left") {
      state.cursorLeft();
    } else if (key.name === "right") {
      state.cursorRight();
    } else if (key.name === "backspace") {
      state.deleteChar();
    } else if (key.name === "escape") {
      state.toggleEditMode();
    } else if (key.name === "return") {
      state.addItem();
    } else if (str && !key.ctrl && !key.meta) {
      state.addChar(str);
    }
  } else {
    if (key.name === "q") {
      exitProgram();
    } else if (key.name === "up") {
      state.moveUp();
    } else if (key.name === "down") {
      state.moveDown();
    } else if (key.name === "e" || key.name === "escape") {
      state.toggleEditMode();
    }
  }
  
  render(
    state.listItems(),
    state.selectedIndex(),
    state.cursorPos(),
    state.inEditMode(),
  );
};

process.stdin.on("keypress", onKey(state));

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
