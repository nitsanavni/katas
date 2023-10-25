import * as vscode from "vscode";

export async function renameTo(newName: string) {
    await vscode.workspace.applyEdit(
        await vscode.commands.executeCommand(
            "vscode.executeDocumentRenameProvider",
            vscode.window.activeTextEditor?.document.uri,
            vscode.window.activeTextEditor?.selection.active,
            newName
        )
    );
}
