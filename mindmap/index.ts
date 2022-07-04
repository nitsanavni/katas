import { BehaviorSubject, filter, map, Subject } from "rxjs";

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
const mode = new BehaviorSubject<Mode>("navigating");

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
  mode,
});

const file = new BehaviorSubject<string>(filePath);

read(file);

makeView({
  input: process.stdin,
  output: process.stdout,
  model,
  mode: mode.asObservable(),
  line,
});

const { key } = makeKey({
  input: process.stdin,
  mode: mode.asObservable(),
});

makeMode({ key, line, subject: mode });

key.pipe(map(keyMap)).subscribe(command);

command
  .pipe(filter(({ command }) => command == "quit"))
  .subscribe(() => (until.next(), process.exit()));

setTimeout(() => writeFile({ filePath, model, until }), 100);
