import { State } from './state';

const moveToFirstChild = (state: State): State => {
  if (state.selectedIndex < state.listItems.length - 1) {
    const currentIndent = state.listItems[state.selectedIndex].indent;
    for (let i = state.selectedIndex + 1; i < state.listItems.length; i++) {
      if (state.listItems[i].indent === currentIndent + 1) {
        state.selectedIndex = i;
        state.cursorPosition = 0;
        break;
      }
    }
  }
  return state;
};

export default moveToFirstChild;
