import { Command } from "./command";

export const keyMap = (keyName: string): Command =>
  ((
    {
      escape: { command: "home" },
      right: { command: "go to child" },
      q: { command: "quit" },
    } as const
  )[keyName] || { command: "noop" });
