import find from "./find";
import { OutlineNode } from "./outline-node";

export const newChild = (nodes: OutlineNode[]): OutlineNode[] => {
  // TODO - we can avoid this O(n) by simply saving the selected index -> will get to O(1)
  const [{ indentation }, s] = find(nodes, (n) => !!n.selected)!;

  nodes[s].selected = false;

  nodes.splice(s + 1, 0, {
    body: "",
    selected: true,
    indentation: indentation + 1,
  });

  return nodes;
};
