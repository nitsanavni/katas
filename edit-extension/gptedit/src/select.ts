import * as vscode from "vscode";
import { reveal } from "./reveal";

export const select = ({ term }: { term: string }) => {
    const editor = vscode.window.activeTextEditor!;
    const document = editor.document;

    const index = document.getText().indexOf(term);
    const start = document.positionAt(index);
    const end = document.positionAt(index + term.length);

    editor.selection = new vscode.Selection(start, end);

    reveal();
};
