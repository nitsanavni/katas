import * as vscode from "vscode";
import { inspect } from "util";

import { callGPT } from "./callGPT";
import { renameTo } from "./renameTo";
import { expand } from "./expand";
import { select } from "./select";
import { promptToSelectTool } from "./promptToSelectTool";
import { promptToEditByReplacingSelection } from "./promptToEditByReplacingSelection";
import { replaceSelectionWith } from "./replaceSelectionWith";
import { shrink } from "./shrink";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("gptedit.helloWorld", async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;

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

            const output = vscode.window.createOutputChannel(`hello gptedit`);

            const log = <T>(arg: T): T => {
                output.appendLine(inspect(arg));
                return arg;
            };

            output.show(true);

            const editToCode = await vscode.window.showInputBox({
                prompt: "Edit to perform",
                value: "Edit to perform",
            });

            if (!editToCode) {
                return;
            }

            if (/\/select .+$/i.test(editToCode)) {
                select({ term: /\/select (.+)$/i.exec(editToCode)![1] });
                await expand();

                return;
            }

            if (/\/renameTo/gi.test(editToCode)) {
                await renameTo({
                    newName: /renameTo (\w+)/gi.exec(editToCode)![1],
                });

                return;
            }

            if (/\/indent/gi.test(editToCode)) {
                (({
                    editor,
                    editToCode: editToCode,
                }: {
                    editor: vscode.TextEditor;
                    editToCode: string;
                }) => {
                    const indent = /\/indent:(\d+)/gi.exec(editToCode);

                    if (indent) {
                        const LINE_NUMBER = parseInt(indent[1], 10);
                        editor.selection = new vscode.Selection(
                            LINE_NUMBER,
                            0,
                            LINE_NUMBER,
                            0
                        );
                        vscode.commands.executeCommand(
                            "editor.action.indentLines"
                        );

                        return;
                    }

                    vscode.commands.executeCommand("editor.action.indentLines");
                })({ editor, editToCode: editToCode });
                return;
            }

            if (/\/expand:\d+/gi.test(editToCode)) {
                const expandTimes = /\/expand:(\d+)/gi.exec(editToCode);

                if (expandTimes) {
                    const times = parseInt(expandTimes[1], 10);
                    await expand({ times });
                }

                return;
            }

            if (/\/shrink:\d+/gi.test(editToCode)) {
                const shrinkTimes = /\/shrink:(\d+)/gi.exec(editToCode);

                if (shrinkTimes) {
                    const times = parseInt(shrinkTimes[1], 10);
                    await shrink({ times });
                }

                return;
            }

            const tool = (await callGPT({
                prompt: promptToSelectTool({
                    selectedFile,
                    editToCode: editToCode,
                    fileContent: fileContentWithMarkers,
                }),
            }))!;

            log(tool);

            if (/\/renameTo/gi.test(tool)) {
                const newName = /\/renameTo (.+)$/gi.exec(tool)![1];

                await renameTo({ newName });

                return;
            }

            replaceSelectionWith({
                replacement: await callGPT({
                    prompt: promptToEditByReplacingSelection({
                        selectedFile,
                        editToCode,
                        fileContent: fileContentWithMarkers,
                    }),
                }),
            });
        })
    );
}
