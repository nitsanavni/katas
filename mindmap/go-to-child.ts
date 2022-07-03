import find from "./find";
import { OutlineNode } from "./outline-node";

export const goToChild = (nodes: OutlineNode[]): OutlineNode[] => {
  const [{ indentation }, s] = find(nodes, (n) => !!n.selected)!;

  if (nodes[s + 1].indentation > indentation) {
    return nodes.map((n, i) =>
      i == s + 1 ? { ...n, selected: true } : { ...n, selected: false }
    );
  }

  return nodes;
};
