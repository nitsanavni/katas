import * as vscode from "vscode";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "explain.helloWorld",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const selection = editor.selection;
        const text = document.getText(selection);

        const model = "gpt-4";
        const messages = [
          {
            role: "user" as const,
            content: `task: explain

format: very short answer

explain this:
${text}`,
          },
        ];

        try {
          const response = await openai.chat.completions.create({
            model,
            messages,
          });

          const assistantMessage = response.choices[0].message.content;
          vscode.window.showInformationMessage(
            assistantMessage || "No response"
          );
        } catch (error) {
          vscode.window.showErrorMessage(`Error: ${error}`);
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}
