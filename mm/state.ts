import loadFromFile from './loadFromFile';
import saveToFile from './saveToFile';

type State = {
  cursorPosition: number;
  listItems: Array<{ text: string; indent: number }>;
  selectedIndex: number;
  inEditMode: boolean;
};

type StateTransformFunction = (state: State) => State;

const stateObj: State = {
  cursorPosition: 0,
  listItems: [{ text: "", indent: 0 }],
  selectedIndex: 0,
  inEditMode: false,
};

export const state = {
  cursorPos: () => stateObj.cursorPosition,
  cursorRight: () => {
    stateObj.cursorPosition = Math.min(
      stateObj.listItems[stateObj.selectedIndex].text.length,
      stateObj.cursorPosition + 1
    );
  },
  cursorLeft: () => {
    stateObj.cursorPosition = Math.max(0, stateObj.cursorPosition - 1);
  },
  deleteChar: () => {
    if (stateObj.cursorPosition > 0) {
      stateObj.listItems[stateObj.selectedIndex].text =
        stateObj.listItems[stateObj.selectedIndex].text.slice(0, stateObj.cursorPosition - 1) +
        stateObj.listItems[stateObj.selectedIndex].text.slice(stateObj.cursorPosition);
      stateObj.cursorPosition--;
    }
  },
  addItem: () => {
    const currentIndent = stateObj.listItems[stateObj.selectedIndex]?.indent || 0;
    stateObj.listItems.push({ text: "", indent: currentIndent });
    stateObj.selectedIndex = stateObj.listItems.length - 1;
    stateObj.cursorPosition = 0;
    stateObj.inEditMode = true;
  },
  addChild: () => {
    const parentIndent = stateObj.listItems[stateObj.selectedIndex]?.indent || 0;
    let insertIndex = stateObj.selectedIndex + 1;
    while (insertIndex < stateObj.listItems.length && stateObj.listItems[insertIndex].indent > parentIndent) {
      insertIndex++;
    }
    stateObj.listItems.splice(insertIndex, 0, { text: "", indent: parentIndent + 1 });
    stateObj.selectedIndex = insertIndex;
    stateObj.cursorPosition = 0;
    stateObj.inEditMode = true;
  },
  addSibling: () => {
    const currentIndent = stateObj.listItems[stateObj.selectedIndex]?.indent || 0;
    let insertIndex = stateObj.selectedIndex + 1;
    while (insertIndex < stateObj.listItems.length && stateObj.listItems[insertIndex].indent > currentIndent) {
      insertIndex++;
    }
    stateObj.listItems.splice(insertIndex, 0, { text: "", indent: currentIndent });
    stateObj.selectedIndex = insertIndex;
    stateObj.cursorPosition = 0;
    stateObj.inEditMode = true;
  },
  addChar: (char: string) => {
    stateObj.listItems[stateObj.selectedIndex].text =
      stateObj.listItems[stateObj.selectedIndex].text.slice(0, stateObj.cursorPosition) +
      char +
      stateObj.listItems[stateObj.selectedIndex].text.slice(stateObj.cursorPosition);
    stateObj.cursorPosition++;
  },
  toggleEditMode: () => {
    stateObj.inEditMode = !stateObj.inEditMode;
    if (stateObj.inEditMode) stateObj.cursorPosition = stateObj.listItems[stateObj.selectedIndex].text.length;
  },
  moveUp: () => {
    stateObj.selectedIndex = Math.max(0, stateObj.selectedIndex - 1);
  },
  moveDown: () => {
    stateObj.selectedIndex = Math.min(stateObj.listItems.length - 1, stateObj.selectedIndex + 1);
  },
  moveToParent: () => {
    if (stateObj.selectedIndex > 0) {
      const parentIndent = stateObj.listItems[stateObj.selectedIndex].indent - 1;
      for (let i = stateObj.selectedIndex - 1; i >= 0; i--) {
        if (stateObj.listItems[i].indent === parentIndent) {
          stateObj.selectedIndex = i;
          stateObj.cursorPosition = 0;
          break;
        }
      }
    }
  },
  moveToFirstChild: () => {
    if (stateObj.selectedIndex < stateObj.listItems.length - 1) {
      const currentIndent = stateObj.listItems[stateObj.selectedIndex].indent;
      for (let i = stateObj.selectedIndex + 1; i < stateObj.listItems.length; i++) {
        if (stateObj.listItems[i].indent === currentIndent + 1) {
          stateObj.selectedIndex = i;
          stateObj.cursorPosition = 0;
          break;
        }
      }
    }
  },
  indentItem: () => {
    if (stateObj.selectedIndex <= 0) return;

    const currentItem = stateObj.listItems[stateObj.selectedIndex];
    const parentItem = stateObj.listItems[stateObj.selectedIndex - 1];
    const maxIndent = parentItem.indent + 1;

    if (maxIndent <= currentItem.indent) {
      return;
    }

    currentItem.indent++;

    for (let i = stateObj.selectedIndex + 1; i < stateObj.listItems.length; i++) {
      if (stateObj.listItems[i].indent > (currentItem.indent - 1)) {
        stateObj.listItems[i].indent++;
      } else {
        break;
      }
    }
  },
  dedentItem: () => {
    const currentItem = stateObj.listItems[stateObj.selectedIndex];
    if (currentItem.indent > 0) {
      const oldIndent = currentItem.indent;
      currentItem.indent--;

      for (let i = stateObj.selectedIndex + 1; i < stateObj.listItems.length; i++) {
        if (stateObj.listItems[i].indent > oldIndent) {
          stateObj.listItems[i].indent--;
        } else {
          break;
        }
      }
    }
  },
  deleteCurrentNode: () => {
    if (stateObj.listItems.length === 0 || stateObj.selectedIndex === 0) {
      stateObj.listItems = [{ text: "", indent: 0 }];
      stateObj.selectedIndex = 0;
      stateObj.cursorPosition = 0;
      return;
    }

    const currentItemIndent = stateObj.listItems[stateObj.selectedIndex].indent;
    let endIndex = stateObj.selectedIndex + 1;
    while (endIndex < stateObj.listItems.length && stateObj.listItems[endIndex].indent > currentItemIndent) {
      endIndex++;
    }

    stateObj.listItems = [
      ...stateObj.listItems.slice(0, stateObj.selectedIndex),
      ...stateObj.listItems.slice(endIndex)
    ];

    if (stateObj.selectedIndex >= stateObj.listItems.length) {
      stateObj.selectedIndex = stateObj.listItems.length - 1;
    }

    stateObj.cursorPosition = 0;
  },
  inEditMode: () => stateObj.inEditMode,
  selectedIndex: () => stateObj.selectedIndex,
  listItems: () => stateObj.listItems,
  saveOutlineToFile: async (filePath: string) => {
    await saveToFile(filePath)(stateObj); // Now correctly invoking the function
  },
  loadOutlineFromFile: async (filePath: string) => {
    Object.assign(stateObj, await loadFromFile(filePath)(stateObj));
  },
};
