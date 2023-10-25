import * as vscode from "vscode";
import { inspect } from "util";

export const createOutputChannel = () => {
    const output = vscode.window.createOutputChannel(`hello gptedit`);

    output.show(true);

    const log = <T>(arg: T): T => {
        output.appendLine(inspect(arg));
        return arg;
    };

    return { log };
};
