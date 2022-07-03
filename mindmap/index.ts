import dedent from "dedent";
import { BehaviorSubject, EMPTY, filter, map, Subject } from "rxjs";

import { Command } from "./command";
import { makeKey } from "./key";
import { keyMap } from "./key-map";
import { makeModel } from "./model";
import parse from "./parse";
import { makeView } from "./view";

const command = new Subject<Command>();

const init = dedent`0|s|a
                    1|a.1
                    2|a.1.a
                    3|a.1.a.1
                    2|a.1.b
                    1|a.2`;

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
