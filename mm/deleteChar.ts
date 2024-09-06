import { State } from './state';

const deleteChar = (state: State): State => {
  if (state.cursorPosition > 0) {
    state.listItems[state.selectedIndex].text =
      state.listItems[state.selectedIndex].text.slice(0, state.cursorPosition - 1) +
      state.listItems[state.selectedIndex].text.slice(state.cursorPosition);
    state.cursorPosition--;
  }
  return state;
};

export default deleteChar;
