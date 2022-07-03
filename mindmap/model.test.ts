import test from "ava";
import dedent from "dedent";
import { Subject } from "rxjs";

import formatMindmap from "./format-mindmap";
import { makeModel } from "./model";
import { OutlineNode } from "./outline-node";
import parse from "./parse";

test("init", (t) => {
  const initWith = new Subject<OutlineNode[]>();
  const model = makeModel({ initWith });
  const outline = dedent`0|root
                         1|s|hello model!`;
  const nodes = parse(outline);
  initWith.next(nodes);

  t.snapshot(formatMindmap(model.get()));
});
