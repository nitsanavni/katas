import * as vscode from "vscode";
import { callGPT } from "./callGPT";
import { inspect } from "util";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("gptedit.helloWorld", async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;

            const document = editor.document;
            const selection = editor.selection;
            const text = document.getText(selection);
            const selectedFile = document.fileName;
            const selectedCode = text;
            const fileContent = document.getText();

            let markedText = `<selection>${text}</selection>`;
            const replaceStart = document.offsetAt(selection.start);
            const fileContentWithMarkers =
                fileContent.slice(0, replaceStart) +
                markedText +
                fileContent.slice(replaceStart + text.length);

            const output = vscode.window.createOutputChannel(`hello gptedit`);

            output.show(true);

            output.appendLine(inspect({ text, selectedFile }));
            output.appendLine(fileContentWithMarkers);

            const EDIT_TO_CODE = await vscode.window.showInputBox({
                prompt: "Edit to perform",
                value: "Edit to perform",
            });

            if (!EDIT_TO_CODE) {
                return;
            }

            const title = await callGPT({
                prompt: `task: only provide a title to the following user request
format: only the title, plain text, no quotes
user request:
${EDIT_TO_CODE}`,
            });

            if (/indent/gi.test(EDIT_TO_CODE)) {
                (({
                    editor,
                    EDIT_TO_CODE,
                }: {
                    editor: vscode.TextEditor;
                    EDIT_TO_CODE: string;
                }) => {
                    const INDENT = /indent:(\d+)/gi.exec(EDIT_TO_CODE);

                    if (INDENT) {
                        const LINE_NUMBER = parseInt(INDENT[1], 10);
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
                })({ editor, EDIT_TO_CODE });
                return;
            }

            if (/expand:\d+/gi.test(EDIT_TO_CODE)) {
                const EXPAND_TIMES = /expand:(\d+)/gi.exec(EDIT_TO_CODE);

                if (EXPAND_TIMES) {
                    const TIMES = parseInt(EXPAND_TIMES[1], 10);
                    for (let i = 0; i < TIMES; i++) {
                        await vscode.commands.executeCommand(
                            "editor.action.smartSelect.expand"
                        );
                    }
                }

                return;
            }

            if (/shrink:\d+/gi.test(EDIT_TO_CODE)) {
                const SHRINK_TIMES = /shrink:(\d+)/gi.exec(EDIT_TO_CODE);

                if (SHRINK_TIMES) {
                    const TIMES = parseInt(SHRINK_TIMES[1], 10);
                    for (let i = 0; i < TIMES; i++) {
                        await vscode.commands.executeCommand(
                            "editor.action.smartSelect.shrink"
                        );
                    }
                }

                return;
            }

            const prompt = makePrompt({
                selectedFile,
                EDIT_TO_CODE,
                fileContent: fileContentWithMarkers,
                selectedCode,
            });

            output.appendLine(prompt);

            const assistantMessage = await callGPT({
                prompt: prompt,
            });

            if (!assistantMessage) return;

            editor.edit((editBuilder) => {
                editBuilder.replace(selection, `${assistantMessage}`);
            });
        })
    );
}

function makePrompt({
    selectedFile,
    EDIT_TO_CODE,
    fileContent,
    selectedCode,
}: {
    selectedFile: string;
    EDIT_TO_CODE: string;
    fileContent: string;
    selectedCode: string;
}) {
    return `# Task

Edit this file: ${selectedFile}
How: replace the selected section ('selection') with new text

# Format

only respond with the new edited text to replace the previous selected text, nothing else
don't use a code block
!important!: preserve the exact indentation of the original, it is very important to preserve leading spaces; unless the edit is about that
preserve original formatting and style, unless the edit is about that

# Context

The edit to perform is:
${EDIT_TO_CODE}

The file content is (note indentation), selection is marked with <selection>...</selection> tags, and the file is tagged with <file></file>:
<file>${fileContent}</file>`;
}
