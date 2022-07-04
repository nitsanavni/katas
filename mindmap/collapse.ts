import { Transform } from "./transform";

export const collapse: Transform = (nodes) =>
  nodes.map((n) => (n.selected ? { ...n, collapsed: !n.collapsed } : { ...n }));

export default collapse;
