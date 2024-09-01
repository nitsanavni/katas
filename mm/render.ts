import logUpdate from "log-update";

function renderItem(item: { text: string; indent: number }, index: number, selectedIndex: number, cursorPosition: number, inEditMode: boolean): string {
  const indentation = "  ".repeat(item.indent);
  
  if (index === selectedIndex) {
    if (inEditMode) {
      const beforeCursor = item.text.slice(0, cursorPosition);
      const cursorChar = item.text[cursorPosition] || " ";
      const afterCursor = item.text.slice(cursorPosition + 1);
      const coloredCursorChar = `\x1b[47m\x1b[30m${cursorChar}\x1b[0m`;
      return `${indentation}${beforeCursor}${coloredCursorChar}${afterCursor}`;
    } else {
      return `\x1b[47m\x1b[30m${indentation}${item.text}\x1b[0m`;
    }
  }
  
  return `${indentation}${item.text}`;
}

export function render(
  items: { text: string; indent: number }[],
  selectedIndex: number,
  cursorPosition: number,
  inEditMode: boolean,
) {
  const output = items
    .map((item, index) => renderItem(item, index, selectedIndex, cursorPosition, inEditMode))
    .join("\n");

  logUpdate(output);
}
