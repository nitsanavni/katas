import * as vscode from "vscode";
import { gptEditCb } from "./gptEditCb";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("gptedit.helloWorld", gptEditCb)
    );
}
