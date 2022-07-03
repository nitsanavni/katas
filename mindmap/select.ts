import { OutlineNode } from "./outline-node";

export const select = (index: number) => (nodes: OutlineNode[]) =>
  nodes.map((n, i) =>
    i == index ? { ...n, selected: true } : { ...n, selected: false }
  );

export default select;
