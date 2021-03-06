import { BehaviorSubject, EMPTY, filter, map, Observable } from "rxjs";

import { Command } from "./command";
import { goToChild } from "./go-to-child";
import { goToNextSibling } from "./go-to-next-sibling";
import { goToPreviousSibling } from "./go-to-previous-sibling";
import { goToParent } from "./go-to-parent";
import home from "./home";
import collapse from "./collapse";
import focus from "./focus";
import { OutlineNode } from "./outline-node";
import updateSelectedNodeBody from "./update-selected-node-body";
import { newChild } from "./new-child";
import { Mode } from "./mode";

export const makeModel = ({
  initWith,
  command = EMPTY,
  mode,
}: {
  initWith: Observable<OutlineNode[]>;
  command?: Observable<Command>;
  mode: BehaviorSubject<Mode>;
}) => {
  const subject = new BehaviorSubject<OutlineNode[]>([
    { body: "", indentation: 0, selected: true },
  ]);

  initWith.subscribe(subject);

  const transform = ({ command, payload }: Command): OutlineNode[] => {
    if (mode.getValue() == "navigating") {
      if (command == "focus") {
        return focus(get());
      } else if (command == "collapse") {
        return collapse(get());
      } else if (command == "home") {
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
    } else if (mode.getValue() == "typing") {
      if (command == "update selected node body") {
        return updateSelectedNodeBody(payload)(get());
      }
    }

    if (command == "new child") {
      setTimeout(() => mode.next("typing"), 20);
      return newChild(get());
    }

    return get();
  };

  command
    .pipe(
      filter(
        ({ command }) =>
          command != "quit" && command != "noop" && command != "edit"
      ),
      map(transform)
    )
    .subscribe(subject);

  const get = () => subject.getValue();

  return { get, model: subject.asObservable() };
};
