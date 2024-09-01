import { render } from "./render";

export const onKey = (state) => (str, key) => {
  if (state.inEditMode()) {
    switch (key.name) {
      case "left":
        state.cursorLeft();
        break;
      case "right":
        state.cursorRight();
        break;
      case "backspace":
        state.deleteChar();
        break;
      case "escape":
        state.toggleEditMode();
        break;
      case "return":
        state.addItem();
        break;
      default:
        if (str && !key.ctrl && !key.meta) {
          state.addChar(str);
        }
        break;
    }
  } else {
    switch (key.name) {
      case "q":
        exitProgram();
        break;
      case "up":
        state.moveUp();
        break;
      case "down":
        state.moveDown();
        break;
      case "e":
      case "escape":
        state.toggleEditMode();
        break;
      case "tab":
        key.shift ? state.dedentItem() : state.indentItem();
        break;
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
  process.exit();
}
