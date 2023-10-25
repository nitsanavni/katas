import * as vscode from "vscode";

export const replaceSelectionWith = ({
    replacement,
}: {
    replacement: string | null;
}) => {
    replacement &&
        vscode.window.activeTextEditor!.edit((editBuilder) => {
            editBuilder.replace(
                vscode.window.activeTextEditor!.selection,
                replacement
            );
        });
};
