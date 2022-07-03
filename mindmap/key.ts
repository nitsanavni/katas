import readline from "readline";
import { filter, Observable, Subject, tap } from "rxjs";
import { Mode } from "./mode";

export const makeKey = ({
  input,
  mode,
}: {
  input: NodeJS.ReadableStream;
  mode: Observable<Mode>;
}) => {
  mode
    .pipe(
      filter((m) => m == "navigating"),
      tap(() => {
        if (process.stdin.isTTY) process.stdin.setRawMode(true);
        readline.emitKeypressEvents(input, readline.createInterface({ input }));
        input.removeAllListeners("keypress");
        input.on("keypress", (_, key) => {
          if (key?.name) subject.next(key.name);
        });
      })
    )
    .subscribe();

  // TODO - extract `type Key`
  const subject = new Subject<string>();

  return { key: subject.asObservable() };
};
