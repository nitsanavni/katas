import find from "./find";
import { OutlineNode } from "./outline-node";

const select = (index: number) => (nodes: OutlineNode[]) =>
  nodes.map((n, i) =>
    i == index ? { ...n, selected: true } : { ...n, selected: false }
  );

export const goToParent = (nodes: OutlineNode[]): OutlineNode[] => {
  const [{ indentation }, s] = find(nodes, (n) => !!n.selected)!;

  for (let i = s; i >= 0; i--) {
    if (nodes[i].indentation < indentation) {
      return select(i)(nodes);
    }
  }

  return nodes;
};
