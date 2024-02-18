import * as vscode from "vscode";

import { handler } from "./handler";
import { handleExtractOneFunction } from "./extract-one-function";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("gptedit.helloWorld", handler)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "gptedit.extractOneFunction",
      handleExtractOneFunction
    )
  );
}
