import { State } from './state';

const deleteCurrentNode = (state: State): State => {
  if (state.listItems.length === 0 || state.selectedIndex === 0) {
    return { ...state, listItems: [{ text: "", indent: 0 }], selectedIndex: 0, cursorPosition: 0 };
  }

  const currentItemIndent = state.listItems[state.selectedIndex].indent;
  let endIndex = state.selectedIndex + 1;
  while (endIndex < state.listItems.length && state.listItems[endIndex].indent > currentItemIndent) {
    endIndex++;
  }

  const updatedListItems = [
    ...state.listItems.slice(0, state.selectedIndex),
    ...state.listItems.slice(endIndex)
  ];

  const newIndex = state.selectedIndex >= updatedListItems.length ? updatedListItems.length - 1 : state.selectedIndex;

  return { ...state, listItems: updatedListItems, selectedIndex: newIndex, cursorPosition: 0 };
};

export default deleteCurrentNode;
