import test from "ava";
import dedent from "dedent";
import { BehaviorSubject, Subject } from "rxjs";

import formatMindmap from "./format-mindmap";
import { Command } from "./command";
import { makeModel } from "./model";
import { OutlineNode } from "./outline-node";
import parse from "./parse";

const outline = dedent`0|root
                       1|s|hello model!`;

test("init", (t) => {
  const initWith = new Subject<OutlineNode[]>();
  const model = makeModel({ initWith });
  const nodes = parse(outline);
  initWith.next(nodes);

  t.snapshot(formatMindmap(model.get()));
});

test("listens to commands - e.g. 'update selected node body'", (t) => {
  const initWith = new BehaviorSubject<OutlineNode[]>(parse(outline));
  const command = new Subject<Command>();

  const model = makeModel({ initWith, command, mode: () => "typing" });

  t.snapshot(formatMindmap(model.get()), "before update body");

  command.next({
    command: "update selected node body",
    payload: "updated body",
  });

  t.snapshot(formatMindmap(model.get()), "after update body");
});

test("one more example - 'home'", (t) => {
  const initWith = new BehaviorSubject<OutlineNode[]>(parse(outline));
  const command = new Subject<Command>();

  const model = makeModel({ initWith, command });

  t.snapshot(formatMindmap(model.get()), "before going home");

  command.next({ command: "home" });

  t.snapshot(formatMindmap(model.get()), "after going home");
});
