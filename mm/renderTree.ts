import logUpdate from "log-update";
import { cat } from "./cat";

function verticalCat(lines: string[]): string {
  return lines.join("\n");
}

export function getTree(
  items: { text: string; indent: number }[],
  index: number = 0,
  selectedIndex: number = -1,
  cursorPosition: number = 0,
  inEditMode: boolean = false,
): string {
  if (index >= items.length) {
    return "";
  }

  const currentItem = items[index];
  const children = [];

  for (let i = index + 1; i < items.length; i++) {
    if (items[i].indent === currentItem.indent + 1) {
      children.push(
        getTree(items, i, selectedIndex, cursorPosition, inEditMode),
      );
    } else if (items[i].indent <= currentItem.indent) {
      break;
    }
  }

  const childrenRendered = children.length > 0 ? verticalCat(children) : "";

  const childrenLines = childrenRendered.split("\n");
  const childrenHeight = childrenLines.length;

  const parentVerticalPosition = Math.floor((childrenHeight - 1) / 2);

  const paddedParentLines = [
    ...(parentVerticalPosition > 0
      ? Array(parentVerticalPosition).fill("")
      : []),
    selectedIndex === index
      ? renderSelectedItem(currentItem, cursorPosition, inEditMode)
      : currentItem.text,
  ];

  const dotPrefix = '\x1b[33m.\x1b[0m';

  if (paddedParentLines.length > 0) {
    paddedParentLines[paddedParentLines.length - 1] = `${dotPrefix}${paddedParentLines[paddedParentLines.length - 1]}`;
  }

  const parentLineWithDot = paddedParentLines.join("\n");

  return cat(parentLineWithDot, childrenRendered);
}

export function extract(
  items: { text: string; indent: number }[],
  selectedIndex: number = -1,
  cursorPosition: number = 0,
  inEditMode: boolean = false,
): string {
  return getTree(
    [{ text: "", indent: -1 }, ...items],
    0,
    selectedIndex + 1,
    cursorPosition,
    inEditMode,
  );
}

export function render(
  items: { text: string; indent: number }[],
  selectedIndex: number = -1,
  cursorPosition: number = 0,
  inEditMode: boolean = false,
) {
  logUpdate(extract(items, selectedIndex, cursorPosition, inEditMode));
}

export function renderSelectedItem(item: { text: string; indent: number }, cursorPosition: number, inEditMode: boolean): string {
  if (inEditMode) {
    const beforeCursor = item.text.slice(0, cursorPosition);
    const cursorChar = item.text[cursorPosition] || " ";
    const afterCursor = item.text.slice(cursorPosition + 1);
    const coloredCursorChar = `\x1b[47m\x1b[30m${cursorChar}\x1b[0m`;
    return `${beforeCursor}${coloredCursorChar}${afterCursor}`;
  } else {
    const cursorChar = item.text.length === 0 ? " " : item.text;
    return `\x1b[47m\x1b[30m${cursorChar}\x1b[0m`;
  }
}
