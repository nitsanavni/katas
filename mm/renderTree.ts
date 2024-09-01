import logUpdate from "log-update";
import { cat } from "./cat"; // Import the cat function from cat.ts
import { expect, test } from "bun:test";

// Internal helper function to concatenate nodes vertically
function verticalCat(lines: string[]): string {
  return lines.join("\n");
}

// Recursive function to render a tree node with its children
export function getTree(
  items: { text: string; indent: number }[],
  index: number = 0,
): string {
  if (index >= items.length) {
    return "";
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
    currentItem.text,
  ].join("\n");

  // Use the cat function to concatenate the padded parent and its children horizontally
  //
  console.log("parent:");
  console.log(paddedParentLines);
  console.log("children:");
  console.log(childrenRendered);
  console.log("cat:");
  console.log(cat(paddedParentLines, childrenRendered));

  return cat(paddedParentLines, childrenRendered);
}

// Function to extract the final tree output with a dummy root
export function extract(items: { text: string; indent: number }[]): string {
  return getTree([{ text: "", indent: -1 }, ...items]);
}

// Function to render the entire tree
export function render(items: { text: string; indent: number }[]) {
  logUpdate(extract(items));
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
  expect(extract(items1)).toBe(`    Child 1
RootChild 2Grandchild 1
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
