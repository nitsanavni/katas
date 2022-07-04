import { BehaviorSubject, filter, tap, map, Subject, mergeMap } from "rxjs";

import { Command } from "./command";
import { makeKey } from "./key";
import { keyMap } from "./key-map";
import { makeModel } from "./model";
import { makeView } from "./view";
import { mode as makeMode, Mode } from "./mode";
import { filePath } from "./cli";
import { makeReadFile } from "./read-file";
import { writeFile } from "./write-file";

const until = new Subject<void>();
const command = new Subject<Command>();
const line = new Subject<string>();

line
  .pipe(
    map(
      (payload) =>
        ({ command: "update selected node body", payload } as Command)
    )
  )
  .subscribe(command);

const { initialNodes, read } = makeReadFile();

const { model } = makeModel({
  initWith: initialNodes(),
  command,
  mode: () => mode.get(),
});

const file = new BehaviorSubject<string>(filePath);

read(file);

const modeSubject = new Subject<Mode>();

makeView({
  input: process.stdin,
  output: process.stdout,
  model,
  mode: modeSubject.asObservable(),
  line,
});

const { key } = makeKey({
  input: process.stdin,
  mode: modeSubject.asObservable(),
});

const mode = makeMode({ key, line });

mode.mode.subscribe(modeSubject);

key.pipe(map(keyMap)).subscribe(command);

command
  .pipe(filter(({ command }) => command == "quit"))
  .subscribe(() => (until.next(), process.exit()));

setTimeout(() => writeFile({ filePath, model, until }), 100);
