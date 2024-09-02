import logUpdate from "log-update";

export function renderSelectedItem(item: { text: string; indent: number }, cursorPosition: number, inEditMode: boolean): string {
  const indentation = "  ".repeat(item.indent);
  if (inEditMode) {
    const beforeCursor = item.text.slice(0, cursorPosition);
    const cursorChar = item.text[cursorPosition] || " ";
    const afterCursor = item.text.slice(cursorPosition + 1);
    const coloredCursorChar = `\x1b[47m\x1b[30m${cursorChar}\x1b[0m`;
    return `${indentation}${beforeCursor}${coloredCursorChar}${afterCursor}`;
  } else {
    const cursorChar = item.text.length === 0 ? " " : item.text; // Highlighted character for empty items
    return `\x1b[47m\x1b[30m${indentation}${cursorChar}\x1b[0m`;
  }
}

function renderItem(item: { text: string; indent: number }, index: number, selectedIndex: number, cursorPosition: number, inEditMode: boolean): string {
  const indentation = "  ".repeat(item.indent);
  
  if (index === selectedIndex) {
    return renderSelectedItem(item, cursorPosition, inEditMode);
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
