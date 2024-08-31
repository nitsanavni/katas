import { render } from "./render";

export const onKey = (state) => (str, key) => {
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
    } else if (key.name === "tab" && key.shift) {
      state.dedentItem();
    } else if (key.name === "tab") {
      state.indentItem();
    }
  }

  render(
    state.listItems(),
    state.selectedIndex(),
    state.cursorPos(),
    state.inEditMode(),
  );
};

function exitProgram() {
  process.stdout.write("\x1B[?25h"); // Show the cursor
  console.log("Exiting...");
  process.exit();
}
