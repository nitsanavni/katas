#!/usr/bin/env bun

import logUpdate from "log-update";
import readline from "readline";

// State management
let cursorPosition = 0;
let listItems = [""]; // Start with a single item that has an empty value
let selectedIndex = 0; // Select the first (and only) item initially
let inEditMode = true; // Start in edit mode for the first item

// Render the list and input field
function render() {
  let output = listItems.map((item, index) => {
    if (index === selectedIndex) {
      if (inEditMode) {
        const beforeCursor = item.slice(0, cursorPosition);
        const cursorChar = item[cursorPosition] || " "; // If no char, use space
        const afterCursor = item.slice(cursorPosition + 1);

        // Set background color to blue for the character under the cursor
        const coloredCursorChar = `\x1b[47m\x1b[30m${cursorChar}\x1b[0m`; // White background with black text

        return `${beforeCursor}${coloredCursorChar}${afterCursor}`;
      } else {
        // Highlight selected item in navigation mode
        return `\x1b[47m\x1b[30m${item}\x1b[0m`;
      }
    }
    return item;
  }).join("\n");

  logUpdate(output);
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
  } else if (inEditMode) {
    if (key.name === "left") {
      cursorPosition = Math.max(0, cursorPosition - 1);
    } else if (key.name === "right") {
      cursorPosition = Math.min(listItems[selectedIndex].length, cursorPosition + 1);
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
    } else if (key.sequence && !key.ctrl && !key.meta) {
      listItems[selectedIndex] =
        listItems[selectedIndex].slice(0, cursorPosition) +
        str +
        listItems[selectedIndex].slice(cursorPosition);
      cursorPosition++;
    }
  } else {
    if (key.name === "up") {
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
  render();
});

// Ensure cursor is shown on exit, even if an error occurs
process.on("exit", () => {
  process.stdout.write("\x1B[?25h"); // Show the cursor
});

// Initial render
render();
