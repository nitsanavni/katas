import logUpdate from "log-update";
import { cat } from './cat';  // Import the cat function from cat.ts
import { expect, test } from "bun:test";

// Internal helper function to concatenate nodes vertically
function verticalCat(lines: string[]): string {
  return lines.join('\n');
}

// Recursive function to render a tree node with its children
export function getTree(
  items: { text: string; indent: number }[],
  index: number = 0
): string {
  if (index >= items.length) {
    return '';
  }

  const currentItem = items[index];
  const children = [];

  // Find all children of the current item (nodes with exactly one more indent)
  for (let i = index + 1; i < items.length; i++) {
    if (items[i].indent === currentItem.indent + 1) {
      children.push(getTree(items, i));
    } else if (items[i].indent <= currentItem.indent) {
      break;
    }
  }

  // Render the current item and concatenate with its children
  const currentRendered = currentItem.indent >= 0 ? currentItem.text : '';
  const childrenRendered = children.length > 0 ? verticalCat(children) : '';

  return cat(currentRendered, childrenRendered);
}

// Function to extract the final tree output with a dummy root
export function extract(
  items: { text: string; indent: number }[],
): string {
  return getTree([{ text: '', indent: -1 }, ...items]);
}

// Function to render the entire tree
export function render(
  items: { text: string; indent: number }[],
) {
  const output = extract(items);
  logUpdate(output);
}

// Tests for getTree function using the extract wrapper
test("getTree function tests", () => {
  const items1 = [
    { text: "Root", indent: 0 },
    { text: "Child 1", indent: 1 },
    { text: "Child 2", indent: 1 },
    { text: "Grandchild 1", indent: 2 },
    { text: "Grandchild 2", indent: 2 },
  ];
  expect(extract(items1)).toBe(`RootChild 1
    Child 2Grandchild 1
           Grandchild 2`);

  const items2 = [
    { text: "Root", indent: 0 },
    { text: "Child", indent: 1 },
    { text: "Grandchild", indent: 2 },
  ];
  expect(extract(items2)).toBe(`RootChildGrandchild`);

  const items3 = [
    { text: "Root", indent: 0 },
    { text: "Child 1", indent: 1 },
    { text: "Child 2", indent: 1 },
  ];
  expect(extract(items3)).toBe(`RootChild 1
    Child 2`);

  const items4 = [
    { text: "Root", indent: 0 },
    { text: "Child 1", indent: 1 },
    { text: "Grandchild 1", indent: 2 },
    { text: "Child 2", indent: 1 },
  ];
  expect(extract(items4)).toBe(`RootChild 1Grandchild 1
    Child 2`);

  const items5 = [
    { text: "Node 1", indent: 0 },
    { text: "Node 2", indent: 0 },
    { text: "Child 1", indent: 1 },
    { text: "Child 2", indent: 1 },
  ];
  expect(extract(items5)).toBe(`Node 1
Node 2Child 1
      Child 2`);
});
