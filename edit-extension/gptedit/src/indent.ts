import * as vscode from "vscode";

export const indent = () =>
    vscode.commands.executeCommand("editor.action.indentLines");
