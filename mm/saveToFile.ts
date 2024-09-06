import { State } from './state';

const saveToFile = (filePath: string) => async (state: State): Promise<void> => {
  const outline = state.listItems.map(item => '  '.repeat(item.indent) + item.text).join('\n');
  await Bun.write(filePath, outline);
};

export default saveToFile;
