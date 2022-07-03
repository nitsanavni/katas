import { BehaviorSubject, EMPTY, map, Observable } from "rxjs";

import { Command } from "./command";
import home from "./home";
import { OutlineNode } from "./outline-node";
import updateSelectedNodeBody from "./update-selected-node-body";

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

  const transform = ({ command, payload }: Command): OutlineNode[] => {
    if (command == "update selected node body") {
      return updateSelectedNodeBody(payload)(get());
    } else if (command == "home") {
      return home(get());
    }

    return get();
  };

  command.pipe(map(transform)).subscribe(subject);

  const get = () => subject.getValue();

  return { get, model: subject.asObservable() };
};
