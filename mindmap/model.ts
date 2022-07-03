import { BehaviorSubject, EMPTY, map, Observable } from "rxjs";

import { Command } from "./command";
import { goToChild } from "./go-to-child";
import { goToNextSibling } from "./go-to-next-sibling";
import { goToParent } from "./go-to-parent";
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
    if (command == "noop") {
      // can avoid emitting at all?
      return get();
    } else if (command == "update selected node body") {
      return updateSelectedNodeBody(payload)(get());
    } else if (command == "home") {
      return home(get());
    } else if (command == "go to child") {
      return goToChild(get());
    } else if (command == "go to parent") {
      return goToParent(get());
    } else if (command == "go to next sibling") {
      return goToNextSibling(get());
    } else if (command == "go to previous sibling") {
      return get();
    }

    return get();
  };

  command.pipe(map(transform)).subscribe(subject);

  const get = () => subject.getValue();

  return { get, model: subject.asObservable() };
};
