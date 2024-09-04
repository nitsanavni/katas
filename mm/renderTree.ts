import logUpdate from "log-update";
import { cat } from "./cat"; // Import the cat function from cat.ts

// Internal helper function to concatenate nodes vertically
function verticalCat(lines: string[]): string {
  return lines.join("\n");
}

// Recursive function to render a tree node with its children
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

  // Find all children of the current item (nodes with exactly one more indent)
  for (let i = index + 1; i < items.length; i++) {
    if (items[i].indent === currentItem.indent + 1) {
      children.push(
        getTree(items, i, selectedIndex, cursorPosition, inEditMode),
      );
    } else if (items[i].indent <= currentItem.indent) {
      break;
    }
  }

  // Render the children first
  const childrenRendered = children.length > 0 ? verticalCat(children) : "";

  // Calculate the number of lines in the children's rendering
  const childrenLines = childrenRendered.split("\n");
  const childrenHeight = childrenLines.length;

  // Calculate the vertical midpoint of the children
  const parentVerticalPosition = Math.floor((childrenHeight - 1) / 2);

  // Pad the parent node so that it aligns with the middle of the children
  const paddedParentLines = [
    ...(parentVerticalPosition > 0
      ? Array(parentVerticalPosition).fill("")
      : []),
    selectedIndex === index
      ? renderSelectedItem(currentItem, cursorPosition, inEditMode) // Use local renderSelectedItem
      : currentItem.text,
  ];

  // Create a string with the smaller yellow dot symbol to append to the last line of the parent
  const dotPrefix = '\x1b[33m.\x1b[0m'; // Smaller yellow dot character

  // Prepend the dot to the last line of the padded parent lines without a space
  if (paddedParentLines.length > 0) {
    paddedParentLines[paddedParentLines.length - 1] = `${dotPrefix}${paddedParentLines[paddedParentLines.length - 1]}`;
  }

  // Join the padded parent lines into a single string
  const parentLineWithDot = paddedParentLines.join("\n");

  // Use the cat function to concatenate the padded parent and its children horizontally
  return cat(parentLineWithDot, childrenRendered);
}

// Function to extract the final tree output with a dummy root
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

// Function to render the entire tree
export function render(
  items: { text: string; indent: number }[],
  selectedIndex: number = -1,
  cursorPosition: number = 0,
  inEditMode: boolean = false,
) {
  logUpdate(extract(items, selectedIndex, cursorPosition, inEditMode));
}

// Copy of renderSelectedItem specifically for rendering trees
export function renderSelectedItem(item: { text: string; indent: number }, cursorPosition: number, inEditMode: boolean): string {
  if (inEditMode) {
    const beforeCursor = item.text.slice(0, cursorPosition);
    const cursorChar = item.text[cursorPosition] || " ";
    const afterCursor = item.text.slice(cursorPosition + 1);
    const coloredCursorChar = `\x1b[47m\x1b[30m${cursorChar}\x1b[0m`;
    return `${beforeCursor}${coloredCursorChar}${afterCursor}`;
  } else {
    const cursorChar = item.text.length === 0 ? " " : item.text; // Highlighted character for empty items
    return `\x1b[47m\x1b[30m${cursorChar}\x1b[0m`;
  }
}
