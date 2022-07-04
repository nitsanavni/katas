import { Transform } from "./transform";

export const focus: Transform = (nodes) =>
  nodes.map((n) => (n.selected ? { ...n, focused: !n.focused } : { ...n }));

export default focus;
