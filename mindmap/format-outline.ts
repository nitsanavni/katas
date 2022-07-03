import { OutlineNode } from "./outline-node";

const formatOutlineLine = ({
  indentation,
  selected,
  body,
}: OutlineNode): string => `${indentation}|${selected ? "s|" : ""}${body}`;

export const formatOutline = (nodes: OutlineNode[]): string[] =>
  nodes.map(formatOutlineLine);

export default formatOutline;
