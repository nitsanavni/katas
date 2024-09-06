import { State } from './state';

const addSibling = (state: State): State => {
  const currentIndent = state.listItems[state.selectedIndex]?.indent || 0;
  let insertIndex = state.selectedIndex + 1;
  while (insertIndex < state.listItems.length && state.listItems[insertIndex].indent > currentIndent) {
    insertIndex++;
  }
  state.listItems.splice(insertIndex, 0, { text: "", indent: currentIndent });
  state.selectedIndex = insertIndex;
  state.cursorPosition = 0;
  state.inEditMode = true;
  return state;
};

export default addSibling;
