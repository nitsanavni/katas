import { OutlineNode } from "./outline-node";

const formatOutlineLine = ({
  indentation,
  selected,
  collapsed,
  focused,
  body,
}: OutlineNode): string =>
  `${indentation}|${selected ? "s" : ""}${collapsed ? "c" : ""}${focused ? "f" : ""}${
    selected || collapsed || focused ? "|" : ""
  }${body}`;

export const formatOutline = (nodes: OutlineNode[]): string[] =>
  nodes.map(formatOutlineLine);

export default formatOutline;
