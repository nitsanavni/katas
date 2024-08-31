#!/usr/bin/env bun

import readline from "readline";
import { render } from "./render"; // Import the render function

// State management encapsulated
const state = (() => {
  let _cursorPosition = 0;
  let _listItems = [""];
  let _selectedIndex = 0;
  let _inEditMode = true;

  return {
    cursorPos: () => _cursorPosition,
    cursorRight: () => {
      _cursorPosition = Math.min(
        _listItems[_selectedIndex].length,
        _cursorPosition + 1,
      );
    },
    cursorLeft: () => {
      _cursorPosition = Math.max(0, _cursorPosition - 1);
    },
    deleteChar: () => {
      if (_cursorPosition > 0) {
        _listItems[_selectedIndex] =
          _listItems[_selectedIndex].slice(0, _cursorPosition - 1) +
          _listItems[_selectedIndex].slice(_cursorPosition);
        _cursorPosition--;
      }
    },
    addItem: () => {
      _listItems.push("");
      _selectedIndex = _listItems.length - 1;
      _cursorPosition = 0;
      _inEditMode = true;
    },
    addChar: (char) => {
      _listItems[_selectedIndex] =
        _listItems[_selectedIndex].slice(0, _cursorPosition) +
        char +
        _listItems[_selectedIndex].slice(_cursorPosition);
      _cursorPosition++;
    },
    toggleEditMode: () => {
      _inEditMode = !_inEditMode;
      if (_inEditMode) _cursorPosition = _listItems[_selectedIndex].length;
    },
    moveUp: () => {
      _selectedIndex = Math.max(0, _selectedIndex - 1);
    },
    moveDown: () => {
      _selectedIndex = Math.min(_listItems.length - 1, _selectedIndex + 1);
    },
    escape: () => {
      _selectedIndex = -1;
    },
    inEditMode: () => _inEditMode,
    selectedIndex: () => _selectedIndex,
    listItems: () => _listItems,
  };
})();

// Listen to keyboard events
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

function exitProgram() {
  process.stdout.write("\x1B[?25h"); // Show the cursor
  console.log("Exiting...");
  process.exit();
}

process.stdin.on("keypress", (str, key) => {
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
    } else if (key.name === "e") {
      state.toggleEditMode();
    } else if (key.name === "escape") {
      state.toggleEditMode();
    }
  }
  render(
    state.listItems(),
    state.selectedIndex(),
    state.cursorPos(),
    state.inEditMode(),
  );
});

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
