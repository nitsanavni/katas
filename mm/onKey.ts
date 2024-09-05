import { render } from "./renderTree";
import debug from "debug"; // Import debug library

const log = debug("app:onKey"); // Create a debug instance for this module

export const onKey = (state, filePath) => {
  let saveTimeout; // Store timeout ID

  return (str, key) => {
    log(`Received key: ${JSON.stringify(key)}`); // Use debug to log received keys

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
        case "x":
          if (key.ctrl) {
            state.toggleEditMode(); // Use "ctrl + x" to exit edit mode
          }
          break;
        case "return":
          state.addSibling(); // Enter key adds a sibling in edit mode
          break;
        case "tab":
          state.addChild(); // Tab key adds a child item in edit mode
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
        case "backspace":
          state.deleteCurrentNode(); // Change: backspace deletes the current node in nav mode
          break;
        case "c":
          state.addChild();
          break;
        case "s":
          state.addSibling();
          break;
        case "return": // Enter key adds a sibling in navigation mode
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
