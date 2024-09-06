import { render } from "./renderTree";
import debug from "debug";

const log = debug("app:onKey");

export const onKey = (state, filePath) => {
  let saveTimeout;

  const editKeyHandlers = (str, key) => ({
    left: () => state.cursorLeft(),
    right: () => state.cursorRight(),
    backspace: () => state.deleteChar(),
    x: () => {
      if (key.ctrl) {
        state.toggleEditMode();
      }
    },
    return: () => state.addSibling(),
    tab: () => state.addChild(),
    default: () => {
      if (str && !key.ctrl && !key.meta) {
        state.addChar(str);
      }
    },
  });

  const navKeyHandlers = (key) => ({
    left: () => state.moveToParent(),
    right: () => state.moveToFirstChild(),
    backspace: () => state.deleteCurrentNode(),
    c: () => state.addChild(),
    s: () => state.addSibling(),
    return: () => state.addSibling(),
    q: () => exitProgram(),
    up: () => state.moveUp(),
    down: () => state.moveDown(),
    e: () => state.toggleEditMode(),
    tab: () => (key.shift ? state.dedentItem() : state.indentItem()),
  });

  return (str, key) => {
    log(`Received key: ${JSON.stringify(key)}`);

    if (state.inEditMode()) {
      (editKeyHandlers(str, key)[key.name] || editKeyHandlers(str, key).default)();
    } else {
      (navKeyHandlers(key)[key.name] || (() => {}))();
    }

    render(state.get());

    clearTimeout(saveTimeout);
    
    saveTimeout = setTimeout(() => {
      state.saveOutlineToFile(filePath);
    }, 500);
  };
};

function exitProgram() {
  process.stdout.write("\x1B[?25h");
  process.exit();
}
