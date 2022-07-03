import { BehaviorSubject, EMPTY, interval, map, Subject } from "rxjs";

import { Command } from "./command";
import { makeModel } from "./model";
import parse from "./parse";
import { makeView } from "./view";

const command = new Subject<Command>();

const { model } = makeModel({
  initWith: new BehaviorSubject(parse("0|s|init root")),
  command,
});

makeView({ input: process.stdin, output: process.stdout, model, mode: EMPTY });

interval(1000)
  .pipe(
    map(
      (v, i) =>
        ({
          command: "update selected node body",
          payload: `${v}:${i}`,
        } as Command)
    )
  )
  .subscribe(command);
