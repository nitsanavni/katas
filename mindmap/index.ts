import { BehaviorSubject, EMPTY, map, Subject } from "rxjs";

import { Command } from "./command";
import { makeKey } from "./key";
import { keyMap } from "./key-map";
import { makeModel } from "./model";
import parse from "./parse";
import { makeView } from "./view";

const command = new Subject<Command>();

const { model } = makeModel({
  initWith: new BehaviorSubject(parse("0|init root\n1|s|child")),
  command,
});

makeView({ input: process.stdin, output: process.stdout, model, mode: EMPTY });

const { key } = makeKey({ input: process.stdin });

key.pipe(map(keyMap)).subscribe(command);
