import { Command } from "./command";

export const keyMap = (keyName: string): Command =>
  ((
    {
      escape: { command: "home" },
      h: { command: "home" },
      tab: { command: "new child" },
      right: { command: "go to child" },
      left: { command: "go to parent" },
      down: { command: "go to next sibling" },
      up: { command: "go to previous sibling" },
      q: { command: "quit" },
      f: { command: "focus" },
      e: { command: "edit" },
      space: { command: "collapse" },
    } as const
  )[keyName] || { command: "noop" });
