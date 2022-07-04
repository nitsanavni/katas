type CommandTypeTodo =
  | "new sibling"
  | "edit node body"
  | "remove node"
  | "move: indent"
  | "move: outdent"
  | "move: down sibling list"
  | "move: up sibling list"
  | "collapse children"
  | "expand children"
  | "deep collapse children"
  | "deep expand children"
  | "focus"
  | "unfocus"
  | "copy body"
  | "deep copy"
  | "deep cut"
  | "paste string"
  | "deep paste";

export type CommandType =
  | "focus"
  | "collapse"
  | "noop"
  | "update selected node body"
  | "new child"
  | "home"
  | "go to child"
  | "go to parent"
  | "go to next sibling"
  | "go to previous sibling"
  | "quit";

export type Command = {
  command: CommandType;
  payload?: string;
};
