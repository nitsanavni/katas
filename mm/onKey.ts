import { render } from "./renderTree";
import debug from "debug"; // Import debug library

const log = debug("app:onKey"); // Create a debug instance for this module

export const onKey = (state, filePath) => {
  let saveTimeout; // Store timeout ID

  const editKeyHandlers = (str, key) => ({
    left: () => state.cursorLeft(),
    right: () => state.cursorRight(),
    backspace: () => state.deleteChar(),
    x: () => {
      if (key.ctrl) {
        state.toggleEditMode(); // Use "ctrl + x" to exit edit mode
      }
    },
    return: () => state.addSibling(), // Enter key adds a sibling in edit mode
    tab: () => state.addChild(), // Tab key adds a child item in edit mode
    default: () => {
      if (str && !key.ctrl && !key.meta) {
        state.addChar(str);
      }
    }
  });

  const navKeyHandlers = (key) => ({
    left: () => state.moveToParent(),
    right: () => state.moveToFirstChild(),
    backspace: () => state.deleteCurrentNode(), // Backspace deletes the current node in nav mode
    c: () => state.addChild(),
    s: () => state.addSibling(),
    return: () => state.addSibling(), // Enter key adds a sibling in navigation mode
    q: () => exitProgram(),
    up: () => state.moveUp(),
    down: () => state.moveDown(),
    e: () => state.toggleEditMode(),
    tab: () => (key.shift ? state.dedentItem() : state.indentItem()),
  });

  return (str, key) => {
    log(`Received key: ${JSON.stringify(key)}`); // Use debug to log received keys

    if (state.inEditMode()) {
      (editKeyHandlers(str, key)[key.name] || editKeyHandlers(str, key).default)(); 
    } else {
      (navKeyHandlers(key)[key.name] || (() => {}))(); 
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
