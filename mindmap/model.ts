import { BehaviorSubject, EMPTY, map, Observable } from "rxjs";

import { Command } from "./command";
import { OutlineNode } from "./outline-node";

export const makeModel = ({
  initWith,
  command = EMPTY,
}: {
  initWith: Observable<OutlineNode[]>;
  command?: Observable<Command>;
}) => {
  const subject = new BehaviorSubject<OutlineNode[]>([
    { body: "", indentation: 0 },
  ]);

  initWith.subscribe(subject);

  const updateSelectedNodeBody = ({
    nodes,
    w,
  }: {
    nodes: OutlineNode[];
    w?: string;
  }) => nodes.map((n) => ({ ...n, ...(n.selected ? { body: w || "" } : {}) }));

  const transform = (command: Command): OutlineNode[] => {
    if (command.command == "update selected node body") {
      return updateSelectedNodeBody({ nodes: get(), w: command.with });
    }

    return get();
  };

  command.pipe(map(transform)).subscribe(subject);

  const get = () => subject.getValue();

  return { get };
};
