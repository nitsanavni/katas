import * as vscode from "vscode";

export const reveal = () => {
    vscode.window.activeTextEditor!.revealRange(
        vscode.window.activeTextEditor!.selection,
        vscode.TextEditorRevealType.InCenterIfOutsideViewport
    );
};
