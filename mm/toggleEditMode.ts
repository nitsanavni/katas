import { State } from './state';

const toggleEditMode = (state: State): State => {
  state.inEditMode = !state.inEditMode;
  if (state.inEditMode) state.cursorPosition = state.listItems[state.selectedIndex].text.length;
  return state;
};

export default toggleEditMode;
