#!/usr/bin/env bun

import readline from "readline";
import { render } from "./render"; // Import the render function

// State management
let cursorPosition = 0;
let listItems = [""]; // Start with a single item that has an empty value
let selectedIndex = 0; // Select the first (and only) item initially
let inEditMode = true; // Start in edit mode for the first item

// Listen to keyboard events
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

function exitProgram() {
  process.stdout.write("\x1B[?25h"); // Show the cursor
  console.log("Exiting...");
  process.exit();
}

process.stdin.on("keypress", (str, key) => {
  if (inEditMode) {
    if (key.name === "left") {
      cursorPosition = Math.max(0, cursorPosition - 1);
    } else if (key.name === "right") {
      cursorPosition = Math.min(
        listItems[selectedIndex].length,
        cursorPosition + 1,
      );
    } else if (key.name === "backspace") {
      if (cursorPosition > 0) {
        listItems[selectedIndex] =
          listItems[selectedIndex].slice(0, cursorPosition - 1) +
          listItems[selectedIndex].slice(cursorPosition);
        cursorPosition--;
      }
    } else if (key.name === "escape") {
      // Exit edit mode
      inEditMode = false;
      cursorPosition = 0;
    } else if (key.name === "return") {
      // Add the current input as a new item to the list and clear the input
      listItems.push("");
      selectedIndex = listItems.length - 1; // Select the new item
      cursorPosition = 0;
      inEditMode = true; // Enter edit mode for the new item
    } else if (str && !key.ctrl && !key.meta) {
      // Only update the list if str is a valid string
      listItems[selectedIndex] =
        listItems[selectedIndex].slice(0, cursorPosition) +
        str +
        listItems[selectedIndex].slice(cursorPosition);
      cursorPosition++;
    }
  } else {
    if (key.name === "q") {
      exitProgram();
    } else if (key.name === "up") {
      selectedIndex = Math.max(0, selectedIndex - 1);
    } else if (key.name === "down") {
      selectedIndex = Math.min(listItems.length - 1, selectedIndex + 1);
    } else if (key.name === "e") {
      // Enter edit mode for the selected item
      inEditMode = true;
      cursorPosition = listItems[selectedIndex].length;
    } else if (key.name === "escape") {
      selectedIndex = -1; // Deselect
    }
  }
  render(listItems, selectedIndex, cursorPosition, inEditMode); // Use the imported render function
});

// Ensure cursor is shown on exit, even if an error occurs
process.on("exit", () => {
  process.stdout.write("\x1B[?25h"); // Show the cursor
});

// Initial render
render(listItems, selectedIndex, cursorPosition, inEditMode);
