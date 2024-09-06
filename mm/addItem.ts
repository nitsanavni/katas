import { State } from './state';

const addItem = (state: State): State => {
  const currentIndent = state.listItems[state.selectedIndex]?.indent || 0;
  state.listItems.push({ text: "", indent: currentIndent });
  state.selectedIndex = state.listItems.length - 1;
  state.cursorPosition = 0;
  state.inEditMode = true;
  return state;
};

export default addItem;
