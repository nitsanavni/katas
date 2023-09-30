import * as vscode from "vscode";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "gptedit.helloWorld",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const selection = editor.selection;
        const text = document.getText(selection);
        const SELECTED_FILE = document.fileName;
        const SELECTED_CODE = text;
        const FILE_CONTENT = document.getText();
        const START_LINE = selection.start.line;
        const END_LINE = selection.end.line;
        const EDIT_TO_CODE = await vscode.window.showInputBox({
          prompt: "Edit to perform",
          value: "Edit to perform",
        });

        const model = "gpt-4";
        const messages = [
          {
            role: "user" as const,
            content: `Task:
Edit the file ${SELECTED_FILE} from line ${START_LINE} to ${END_LINE}

The edit to perform is:
${EDIT_TO_CODE}

format:
only respond with the new code to replace the previous code, nothing else
don't use a code block
!important!: preserve the exact indentation of the original, it is very important to preserve leading spaces; unless the edit is about that
preserve original formatting and style, unless the edit is about that

The file content is (note indentation):
${FILE_CONTENT}

The selected section of code is (note indentation):
${SELECTED_CODE}
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
              editBuilder.replace(selection, assistantMessage);
            });
          }
        } catch (error) {
          vscode.window.showErrorMessage(`Error: ${error}`);
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}
