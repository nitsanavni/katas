export type CommandType = "noop" | "update selected node body" | "home";

export type Command = {
  command: CommandType;
  payload?: string;
};
