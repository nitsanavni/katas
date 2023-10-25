import * as vscode from "vscode";

export const expand = async ({ times = 1 } = {}) => {
    for (let i = 0; i < times; i++) {
        await vscode.commands.executeCommand(
            "editor.action.smartSelect.expand"
        );
    }
};
