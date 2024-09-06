import { State } from './state';

const cursorLeft = (state: State): State => {
  state.cursorPosition = Math.max(0, state.cursorPosition - 1);
  return state;
};

export default cursorLeft;
