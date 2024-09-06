import { State } from './state';

const dedentItem = (state: State): State => {
  const currentItem = state.listItems[state.selectedIndex];
  if (currentItem.indent > 0) {
    const oldIndent = currentItem.indent;
    currentItem.indent--;

    for (let i = state.selectedIndex + 1; i < state.listItems.length; i++) {
      if (state.listItems[i].indent > oldIndent) {
        state.listItems[i].indent--;
      } else {
        break;
      }
    }
  }
  return state;
};

export default dedentItem;
