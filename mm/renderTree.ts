import logUpdate from "log-update";
import { cat } from "./cat"; // Import the cat function from cat.ts
import { renderSelectedItem } from './render'; // Import the renderSelectedItem function

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
      children.push(getTree(items, i, selectedIndex, cursorPosition, inEditMode));
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
    (selectedIndex === index && inEditMode) ? renderSelectedItem(currentItem, cursorPosition) : currentItem.text,
  ].join("\n");

  // Use the cat function to concatenate the padded parent and its children horizontally
  return cat(paddedParentLines, childrenRendered);
}

// Function to extract the final tree output with a dummy root
export function extract(items: { text: string; indent: number }[], selectedIndex: number = -1, cursorPosition: number = 0, inEditMode: boolean = false): string {
  return getTree([{ text: "", indent: -1 }, ...items], 0, selectedIndex, cursorPosition, inEditMode);
}

// Function to render the entire tree
export function render(items: { text: string; indent: number }[], selectedIndex: number = -1, cursorPosition: number = 0, inEditMode: boolean = false) {
  logUpdate(extract(items, selectedIndex, cursorPosition, inEditMode));
}
