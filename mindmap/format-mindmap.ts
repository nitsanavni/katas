import cat from "./cat";
import filter from "./filter";
import find from "./find";
import { OutlineNode } from "./outline-node";

export const formatMindmap = (nodes: OutlineNode[]) => {
  const formatNode = (i: number): string[] => {
    const node = nodes[i];

    const [, end] = find(
      nodes,
      (candidate) => candidate.indentation <= node.indentation,
      i + 1
    ) || [undefined, nodes.length];

    const focusedChild = find(nodes, (child) => !!child.focused, i + 1);

    if (focusedChild) {
      return formatNode(focusedChild[1]);
    }

    const directChildren: number[] = filter(
      nodes,
      (candidate) => candidate.indentation == node.indentation + 1,
      i + 1,
      end
    ).map(([, i]) => i);

    const childless = directChildren.length == 0;

    const selfFormat = `${node.focused ? "+" : ""}${node.selected ? ">" : ""}${
      node.body
    }${node.collapsed ? `(+${end - i - 1})` : ""}`;

    if (node.collapsed || childless) {
      return [selfFormat];
    }

    return cat([selfFormat], directChildren.flatMap(formatNode));
  };

  return formatNode(0);
};

export default formatMindmap;
