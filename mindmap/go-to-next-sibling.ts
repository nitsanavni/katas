import find from "./find";
import { OutlineNode } from "./outline-node";

const select = (index: number) => (nodes: OutlineNode[]) =>
  nodes.map((n, i) =>
    i == index ? { ...n, selected: true } : { ...n, selected: false }
  );

export const goToNextSibling = (nodes: OutlineNode[]): OutlineNode[] => {
  const [{ indentation }, s] = find(nodes, (n) => !!n.selected)!;

  const candidate = find(nodes, (n) => n.indentation == indentation, s + 1);

  if (!candidate) {
    return nodes;
  }

  const differentParent = find(
    nodes,
    (n) => n.indentation < indentation,
    s + 1
  );

  if (!differentParent || differentParent[1] > candidate[1]) {
    return select(candidate[1])(nodes);
  }

  return nodes;
};
