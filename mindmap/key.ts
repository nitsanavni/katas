import readline from "readline";
import { Subject } from "rxjs";

export const makeKey = ({ input }: { input: NodeJS.ReadableStream }) => {
  if (process.stdin.isTTY) process.stdin.setRawMode(true);
  readline.emitKeypressEvents(input);

  // TODO - extract `type Key`
  const subject = new Subject<string>();

  input.on("keypress", (_, key) => {
    if (key?.name) subject.next(key.name);
  });

  return { key: subject.asObservable() };
};
