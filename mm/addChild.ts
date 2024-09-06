import { State } from './state';

const addChild = (state: State): State => {
  const parentIndent = state.listItems[state.selectedIndex]?.indent || 0;
  let insertIndex = state.selectedIndex + 1;
  while (insertIndex < state.listItems.length && state.listItems[insertIndex].indent > parentIndent) {
    insertIndex++;
  }
  state.listItems.splice(insertIndex, 0, { text: "", indent: parentIndent + 1 });
  state.selectedIndex = insertIndex;
  state.cursorPosition = 0;
  state.inEditMode = true;
  return state;
};

export default addChild;
