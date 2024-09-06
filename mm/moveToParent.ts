import { State } from './state';

const moveToParent = (state: State): State => {
  if (state.selectedIndex > 0) {
    const parentIndent = state.listItems[state.selectedIndex].indent - 1;
    for (let i = state.selectedIndex - 1; i >= 0; i--) {
      if (state.listItems[i].indent === parentIndent) {
        state.selectedIndex = i;
        state.cursorPosition = 0;
        break;
      }
    }
  }
  return state;
};

export default moveToParent;
