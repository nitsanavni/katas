import dedent from "dedent";
import { BehaviorSubject, EMPTY, filter, map, Subject } from "rxjs";

import { Command } from "./command";
import { makeKey } from "./key";
import { keyMap } from "./key-map";
import { makeModel } from "./model";
import parse from "./parse";
import { makeView } from "./view";
import init from "./example-init-outline";

const command = new Subject<Command>();

const { model } = makeModel({
  initWith: new BehaviorSubject(parse(init)),
  command,
});

makeView({ input: process.stdin, output: process.stdout, model, mode: EMPTY });

const { key } = makeKey({ input: process.stdin });

key.pipe(map(keyMap)).subscribe(command);

command
  .pipe(filter(({ command }) => command == "quit"))
  .subscribe(() => process.exit());
