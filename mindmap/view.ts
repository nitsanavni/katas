import { EOL } from "os";
import readline from "readline";
import { Observable, tap } from "rxjs";

import formatMindmap from "./format-mindmap";
import { OutlineNode } from "./outline-node";

const cls = (stream: NodeJS.WritableStream) => {
  readline.cursorTo(stream, 0, 0);
  readline.clearScreenDown(stream);
};

export const makeView = ({
  input,
  output,
  model,
  mode,
}: {
  input: NodeJS.ReadableStream;
  output: NodeJS.WritableStream;
  model: Observable<OutlineNode[]>;
  mode: Observable<OutlineNode[]>;
}) => {
  //   const i = readline.createInterface({ input });

  const render = (nodes: OutlineNode[]) => {
    cls(output);
    output.write(formatMindmap(nodes).join(EOL));
  };

  model.pipe(tap(render)).subscribe();
};
