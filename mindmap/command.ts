export type CommandType =
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
