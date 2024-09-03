import { render } from "./renderTree";

export const onKey = (state, filePath) => {
  let saveTimeout; // Store timeout ID

  return (str, key) => {
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
        case "left":
          state.moveToParent();
          break;
        case "right":
          state.moveToFirstChild();
          break;
        case "c":
          state.addChild();
          break;
        case "s":
          state.addSibling();
          break;
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

    // Clear previous timeout if it exists
    clearTimeout(saveTimeout);
    
    // Set new timeout to save outline to file every 500ms
    saveTimeout = setTimeout(() => {
      state.saveOutlineToFile(filePath);
    }, 500);
  };
};

function exitProgram() {
  process.stdout.write("\x1B[?25h");
  process.exit();
}
