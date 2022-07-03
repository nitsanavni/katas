export type CommandType = "update selected node body";

export type Command = {
  command: CommandType;
  with?: string;
};
