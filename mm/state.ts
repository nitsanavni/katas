import loadFromFile from './loadFromFile';
import saveToFile from './saveToFile';
import deleteCurrentNode from './deleteCurrentNode';
import dedentItem from './dedentItem';
import indentItem from './indentItem';
import addChar from './addChar';
import addChild from './addChild';
import addItem from './addItem';
import addSibling from './addSibling';
import cursorLeft from './cursorLeft';
import cursorRight from './cursorRight';
import deleteChar from './deleteChar';
import moveDown from './moveDown';
import moveUp from './moveUp';
import moveToParent from './moveToParent';
import moveToFirstChild from './moveToFirstChild';
import toggleEditMode from './toggleEditMode';

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
  get: () => stateObj,
  cursorPos: () => stateObj.cursorPosition,
  cursorRight: () => cursorRight(stateObj),
  cursorLeft: () => cursorLeft(stateObj),
  deleteChar: () => deleteChar(stateObj),
  addItem: () => addItem(stateObj),
  addChild: () => addChild(stateObj),
  addSibling: () => addSibling(stateObj),
  addChar: (char: string) => addChar(stateObj, char),
  toggleEditMode: () => toggleEditMode(stateObj),
  moveUp: () => moveUp(stateObj),
  moveDown: () => moveDown(stateObj),
  moveToParent: () => moveToParent(stateObj),
  moveToFirstChild: () => moveToFirstChild(stateObj),
  indentItem: () => {
    indentItem(stateObj);
  },
  dedentItem: () => {
    dedentItem(stateObj);
  },
  deleteCurrentNode: () => {
    Object.assign(stateObj, deleteCurrentNode(stateObj));
  },
  inEditMode: () => stateObj.inEditMode,
  selectedIndex: () => stateObj.selectedIndex,
  listItems: () => stateObj.listItems,
  saveOutlineToFile: async (filePath: string) => {
    await saveToFile(filePath)(stateObj);
  },
  loadOutlineFromFile: async (filePath: string) => {
    Object.assign(stateObj, await loadFromFile(filePath)(stateObj));
  },
};
