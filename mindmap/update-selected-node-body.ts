import { OutlineNode } from "./outline-node";

export const updateSelectedNodeBody =
  (newBody = "") =>
  (nodes: OutlineNode[]) =>
    nodes.map((n) => ({
      ...n,
      ...(n.selected ? { body: newBody } : {}),
    }));

export default updateSelectedNodeBody;
