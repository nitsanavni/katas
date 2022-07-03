import { Command } from "./command";

export const keyMap = (keyName: string): Command =>
  ((
    {
      escape: { command: "home" },
    } as const
  )[keyName] || { command: "noop" });
