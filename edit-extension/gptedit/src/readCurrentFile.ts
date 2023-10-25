import * as vscode from "vscode";

export const readCurrentFile = () => {
    const editor = vscode.window.activeTextEditor!;
    const document = editor.document;
    const selection = editor.selection;
    const text = document.getText(selection);
    const selectedFile = document.fileName;
    const fileContent = document.getText();

    let markedText = `<selection>${text}</selection>`;
    const replaceStart = document.offsetAt(selection.start);
    const fileContentWithMarkers =
        fileContent.slice(0, replaceStart) +
        markedText +
        fileContent.slice(replaceStart + text.length);

    return { selectedFile, fileContentWithMarkers };
};
