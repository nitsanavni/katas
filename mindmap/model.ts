import { BehaviorSubject, EMPTY, filter, map, Observable } from "rxjs";

import { Command } from "./command";
import { goToChild } from "./go-to-child";
import { goToNextSibling } from "./go-to-next-sibling";
import { goToPreviousSibling } from "./go-to-previous-sibling";
import { goToParent } from "./go-to-parent";
import home from "./home";
import { OutlineNode } from "./outline-node";
import updateSelectedNodeBody from "./update-selected-node-body";
import { newChild } from "./new-child";
import { Mode } from "./mode";

export const makeModel = ({
  initWith,
  command = EMPTY,
  mode = () => "navigating",
}: {
  initWith: Observable<OutlineNode[]>;
  command?: Observable<Command>;
  mode?: () => Mode;
}) => {
  const subject = new BehaviorSubject<OutlineNode[]>([
    { body: "", indentation: 0 },
  ]);

  initWith.subscribe(subject);

  const transform = ({ command, payload }: Command): OutlineNode[] => {
    if (mode() == "navigating") {
      if (command == "home") {
        return home(get());
      } else if (command == "go to child") {
        return goToChild(get());
      } else if (command == "go to parent") {
        return goToParent(get());
      } else if (command == "go to next sibling") {
        return goToNextSibling(get());
      } else if (command == "go to previous sibling") {
        return goToPreviousSibling(get());
      }
    } else if (mode() == "typing") {
      if (command == "update selected node body") {
        return updateSelectedNodeBody(payload)(get());
      }
    }

    if (command == "new child") {
      return newChild(get());
    }

    return get();
  };

  command
    .pipe(
      filter(({ command }) => command != "quit"),
      map(transform)
    )
    .subscribe(subject);

  const get = () => subject.getValue();

  return { get, model: subject.asObservable() };
};
