import { OutlineNode } from "./outline-node";

const formatOutlineLine = ({
  indentation,
  selected,
  collapsed,
  body,
}: OutlineNode): string =>
  `${indentation}|${selected ? "s" : ""}${collapsed ? "c" : ""}${
    selected || collapsed ? "|" : ""
  }${body}`;

export const formatOutline = (nodes: OutlineNode[]): string[] =>
  nodes.map(formatOutlineLine);

export default formatOutline;
