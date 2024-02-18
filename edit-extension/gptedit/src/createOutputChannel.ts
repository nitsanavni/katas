import * as vscode from "vscode";
import { inspect } from "util";

export type Log = <T>(arg: T) => T;

export const createOutputChannel = ({ name = "gptedit" } = {}) => {
  const output = vscode.window.createOutputChannel(name);

  output.show(true);

  const log: Log = (arg) => {
    output.appendLine(inspect(arg, true, 6));
    return arg;
  };

  return { log };
};
