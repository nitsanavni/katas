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

    const directChildren: number[] = filter(
      nodes,
      (candidate) => candidate.indentation == node.indentation + 1,
      i + 1,
      end
    ).map(([, i]) => i);

    const childless = directChildren.length == 0;

    const selfFormat = `${node.selected ? ">" : ""}${node.body}`;

    return childless
      ? [selfFormat]
      : cat([selfFormat], directChildren.flatMap(formatNode));
  };

  return formatNode(0);
};

export default formatMindmap;
