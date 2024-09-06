import { State } from './state';

const indentItem = (state: State): State => {
  const currentItem = state.listItems[state.selectedIndex];
  const parentItem = state.listItems[state.selectedIndex - 1];
  
  if (parentItem && currentItem.indent < parentItem.indent + 1) {
    currentItem.indent++;

    for (let i = state.selectedIndex + 1; i < state.listItems.length; i++) {
      if (state.listItems[i].indent >= currentItem.indent) {
        state.listItems[i].indent++;
      } else {
        break;
      }
    }
  }
  
  return state;
};

export default indentItem;
