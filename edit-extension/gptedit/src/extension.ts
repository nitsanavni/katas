import * as vscode from "vscode";

import { handler } from "./handler";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("gptedit.helloWorld", handler)
    );
}
