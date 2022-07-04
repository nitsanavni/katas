import { filter, mergeMap, Observable, takeUntil } from "rxjs";
import { writeFile as write } from "fs/promises";

import { OutlineNode } from "./outline-node";
import formatOutline from "./format-outline";
import { EOL } from "os";

export const writeFile = ({
  filePath,
  model,
  until,
}: {
  filePath: string;
  model: Observable<OutlineNode[]>;
  until: Observable<void>;
}) => {
  model
    .pipe(
      takeUntil(until),
      filter((n) => n?.length > 0),
      mergeMap(async (nodes) => {
        if (nodes == undefined || nodes == null || nodes.length == 0) {
          return;
        }
        await write(filePath, formatOutline(nodes).join(EOL), "utf-8");
      })
    )
    .subscribe();
};
