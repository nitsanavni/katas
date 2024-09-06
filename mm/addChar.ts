import { State } from './state';

const addChar = (state: State, char: string): State => {
  state.listItems[state.selectedIndex].text =
    state.listItems[state.selectedIndex].text.slice(0, state.cursorPosition) +
    char +
    state.listItems[state.selectedIndex].text.slice(state.cursorPosition);
  state.cursorPosition++;
  return state;
};

export default addChar;
