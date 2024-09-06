import { State } from './state';

const cursorRight = (state: State): State => {
  state.cursorPosition = Math.min(
    state.listItems[state.selectedIndex].text.length,
    state.cursorPosition + 1
  );
  return state;
};

export default cursorRight;
