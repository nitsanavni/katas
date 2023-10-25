import * as vscode from "vscode";

export const goToLine = ({ line }: { line: number }) => {
    vscode.window.activeTextEditor!.selection = new vscode.Selection(
        line,
        0,
        line,
        0
    );
};
