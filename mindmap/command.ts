export type CommandType =
  | "noop"
  | "update selected node body"
  | "home"
  | "go to child"
  | "quit";

export type Command = {
  command: CommandType;
  payload?: string;
};
