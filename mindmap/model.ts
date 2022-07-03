import { BehaviorSubject, Observable } from "rxjs";

import { OutlineNode } from "./outline-node";

export const makeModel = ({
  initWith,
}: {
  initWith: Observable<OutlineNode[]>;
}) => {
  const subject = new BehaviorSubject<OutlineNode[]>([
    { body: "", indentation: 0 },
  ]);

  initWith.subscribe(subject);

  const get = () => subject.getValue();

  return { get };
};
