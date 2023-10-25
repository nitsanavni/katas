import * as vscode from "vscode";
import { inspect } from "util";

import { callGPT } from "./callGPT";
import { renameTo } from "./renameTo";
import { expand } from "./expand";
import { select } from "./select";

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
                    for (let i = 0; i < times; i++) {
                        await vscode.commands.executeCommand(
                            "editor.action.smartSelect.shrink"
                        );
                    }
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

            if (/\/rename/gi.test(tool)) {
                const newName = /\/rename (.+)$/gi.exec(tool)![1];

                await renameTo({ newName });

                return;
            }

            const assistantMessage = await callGPT({
                prompt: log(
                    promptToEditByReplacingSelection({
                        selectedFile,
                        editToCode: editToCode,
                        fileContent: fileContentWithMarkers,
                    })
                ),
            });

            log(assistantMessage);

            assistantMessage &&
                editor.edit((editBuilder) => {
                    editBuilder.replace(selection, assistantMessage);
                });
        })
    );
}

const promptToTitle = (editToCode: string): string => {
    return `task: only provide a title to the following user request
format: only the title, plain text, no quotes
user request:
${editToCode}`;
};

const promptToEditByReplacingSelection = ({
    selectedFile,
    editToCode: promptToSelectTool,
    fileContent,
}: {
    selectedFile: string;
    editToCode: string;
    fileContent: string;
}) => {
    return `# Task

Edit this file: ${selectedFile}
How: replace the selected section (marked with <selection>...</selection>) with new text

# Format

only respond with the new edited text to replace the previous selected text, nothing else
don't use a code block
!important!: preserve the exact indentation of the original, it is very important to preserve leading spaces; unless the edit is about that
preserve original formatting and style, unless the edit is about that

# Context

The edit to perform is:
${promptToSelectTool}

The file content is (note indentation), selection is marked with <selection>...</selection> tags, and the file is tagged with <file></file>:
<file>${fileContent}</file>`;
};

const promptToSelectTool = ({
    selectedFile,
    editToCode: EDIT_TO_CODE,
    fileContent,
}: {
    selectedFile: string;
    editToCode: string;
    fileContent: string;
}) => {
    return `# Task

Edit this file: ${selectedFile}
How: select one of the following tools

Prioritize the use of automatic tools over manual ones

## Automatic Tools

### /rename

rename the current symbol under the cursor

example:

/rename newName

## Manual Tools

### /replace

rewrite the selected code by replacing it by an updated version
there are no args required, the tool will know what to do

example:

/replace

# Format

only respond with the chosen tool and args if relevant, nothing else
don't use a code block

# Context

The edit to perform is:
${EDIT_TO_CODE}

The file content is (note indentation), selection is marked with <selection>...</selection> tags, and the file is tagged with <file></file>:
<file>${fileContent}</file>`;
};
