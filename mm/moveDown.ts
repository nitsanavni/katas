import { State } from './state';

const moveDown = (state: State): State => {
  state.selectedIndex = Math.min(state.listItems.length - 1, state.selectedIndex + 1);
  return state;
};

export default moveDown;
