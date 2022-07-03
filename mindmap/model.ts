import { BehaviorSubject, EMPTY, Observable } from "rxjs";

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

  const get = () => subject.getValue();

  return { get };
};
