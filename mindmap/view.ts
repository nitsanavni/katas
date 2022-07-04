import { EOL } from "os";
import readline, { Interface } from "readline";
import { combineLatest, Observable, Observer, tap } from "rxjs";

import formatMindmap from "./format-mindmap";
import { Mode } from "./mode";
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
  line,
}: {
  input: NodeJS.ReadableStream;
  output: NodeJS.WritableStream;
  model: Observable<OutlineNode[]>;
  mode: Observable<Mode>;
  line: Observer<string>;
}) => {
  let i: Interface | undefined;

  const onLine = () => {
    input.removeAllListeners("end");
    i = readline.createInterface({ input, output });
    i.removeAllListeners("line");
    i.on("line", (l) => line.next(l));
  };

  const render = ([nodes, m]: [OutlineNode[], Mode]) => {
    if (m == "navigating") {
      i?.removeAllListeners("line");
      i?.close();
      i = undefined;
      cls(output);
      output.write(formatMindmap(nodes).join(EOL) + EOL);
    } else if (m == "typing") {
      if (!i) {
        onLine();
      }
      if (i?.line == "") {
        cls(output);
        output.write(formatMindmap(nodes).join(EOL) + EOL);
      }
    }
  };

  combineLatest([model, mode]).pipe(tap(render)).subscribe();
};
