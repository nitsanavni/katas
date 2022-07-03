import test from "ava";
import { BehaviorSubject } from "rxjs";

import formatMindmap from "./format-mindmap";
import { makeModel } from "./model";
import { OutlineNode } from "./outline-node";
import parse from "./parse";

test("init", (t) => {
  const model = makeModel({
    initWith: new BehaviorSubject<OutlineNode[]>(
      parse(`0|root
1|s|hello model!`)
    ),
  });

  t.snapshot(formatMindmap(model.get()));
});
