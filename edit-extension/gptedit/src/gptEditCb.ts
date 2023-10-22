import * as vscode from "vscode";
import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const gptEditCb = async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const selection = editor.selection;
    const text = document.getText(selection);
    const selectedFile = document.fileName;
    const selectedCode = text;
    const fileContent = document.getText();
    const START_LINE = selection.start.line;
    const END_LINE = selection.end.line;
    const EDIT_TO_CODE = await vscode.window.showInputBox({
        prompt: "Edit to perform",
        value: "Edit to perform",
    });

    if (!EDIT_TO_CODE) {
        return;
    }

    if (/indent/gi.test(EDIT_TO_CODE)) {
        const INDENT = /indent:(\d+)/gi.exec(EDIT_TO_CODE);
        if (INDENT) {
            const LINE_NUMBER = parseInt(INDENT[1], 10);
            editor.selection = new vscode.Selection(
                LINE_NUMBER,
                0,
                LINE_NUMBER,
                0
            );
            vscode.commands.executeCommand("editor.action.indentLines");
            // const { stdout } = await execa("ls");
            // vscode.window.showInformationMessage(
            //     `Directory files: ${stdout}`
            // );
            return;
        }
        vscode.commands.executeCommand("editor.action.indentLines");
        return;
    }

    const model = "gpt-4";
    const messages = [
        {
            role: "user" as const,
            content: `Task:
Edit the file ${selectedFile} from line ${START_LINE} to ${END_LINE}

The edit to perform is:
${EDIT_TO_CODE}

format:
only respond with the new code to replace the previous code, nothing else
don't use a code block
!important!: preserve the exact indentation of the original, it is very important to preserve leading spaces; unless the edit is about that
preserve original formatting and style, unless the edit is about that

The file content is (note indentation):
${fileContent}

The selected section of code is (note indentation):
${selectedCode}
`,
        },
    ];

    try {
        const response = await openai.chat.completions.create({
            model,
            messages,
        });

        const assistantMessage = response.choices[0].message.content;

        if (assistantMessage) {
            editor.edit((editBuilder) => {
                editBuilder.replace(selection, `${assistantMessage}\n`);
            });
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error}`);
    }
};
