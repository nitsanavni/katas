import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { mergeMap, Observable, Subject } from "rxjs";

import { parse } from "./parse";
import { OutlineNode } from "./outline-node";

export const makeReadFile = () => {
  const _read = async (filePath: string): Promise<OutlineNode[]> => {
    if (!existsSync(filePath)) {
      await writeFile(filePath, "0|s|", { flag: "a+" });
    }

    const outlineString = String(await readFile(filePath));

    return parse(outlineString);
  };

  const parsed = new Subject<OutlineNode[]>();

  const initialNodes = () => parsed.asObservable();

  const read = (filePath: Observable<string>): void => {
    filePath.pipe(mergeMap(_read)).subscribe(parsed);
  };

  return { read, initialNodes };
};
