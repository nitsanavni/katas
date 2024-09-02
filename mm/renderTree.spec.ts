import { expect, test } from "bun:test";
import { extract } from "./renderTree"; 

// Tests for getTree function using the extract wrapper
test("getTree function tests", () => {
  const items1 = [
    { text: "Root", indent: 0 },
    { text: "Child 1", indent: 1 },
    { text: "Child 2", indent: 1 },
    { text: "Grandchild 1", indent: 2 },
    { text: "Grandchild 2", indent: 2 },
  ];
  expect(extract(items1, 0)).toBe(`    Child 1
RootChild 2Grandchild 1
           Grandchild 2`);

  const items2 = [
    { text: "Root", indent: 0 },
    { text: "Child", indent: 1 },
    { text: "Grandchild", indent: 2 },
  ];
  expect(extract(items2, 1)).toBe(`RootChildGrandchild`);

  const items3 = [
    { text: "Root", indent: 0 },
    { text: "Child 1", indent: 1 },
    { text: "Child 2", indent: 1 },
  ];
  expect(extract(items3, 0)).toBe(`RootChild 1
    Child 2`);

  const items4 = [
    { text: "Root", indent: 0 },
    { text: "Child 1", indent: 1 },
    { text: "Grandchild 1", indent: 2 },
    { text: "Child 2", indent: 1 },
  ];
  expect(extract(items4, 0)).toBe(`RootChild 1Grandchild 1
    Child 2`);

  const items5 = [
    { text: "Node 1", indent: 0 },
    { text: "Node 2", indent: 0 },
    { text: "Child 1", indent: 1 },
    { text: "Child 2", indent: 1 },
  ];
  expect(extract(items5, 1)).toBe(`Node 1
Node 2Child 1
      Child 2`);
});
