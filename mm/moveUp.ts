import { State } from './state';

const moveUp = (state: State): State => {
  state.selectedIndex = Math.max(0, state.selectedIndex - 1);
  return state;
};

export default moveUp;
