import { State } from './state';

const loadFromFile = (filePath: string) => async (state: State): Promise<State> => {
  try {
    const file = Bun.file(filePath);
    const content = await file.text();
    const listItems = content.split('\n').map((line) => {
      const indent = line.search(/\S|$/);
      return {
        text: line.trim(),
        indent: indent / 2 // assuming two spaces for each indentation level
      };
    });
    
    return { ...state, listItems, selectedIndex: 0, cursorPosition: 0, inEditMode: false };
  } catch {
    const listItems = [{ text: "", indent: 0 }];
    return { ...state, listItems, selectedIndex: 0, cursorPosition: 0, inEditMode: false };
  }
};

export default loadFromFile;
