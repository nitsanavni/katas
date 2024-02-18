import * as vscode from "vscode";
import { Log, callGPT, createOutputChannel, expand, renameTo } from ".";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const extractOneFunctionPrompt = ({
  codeWithLineNumbers,
}: {
  codeWithLineNumbers: string;
}) => `##Task:
Identify one segment / paragraph of code that can be extracted into a function

## Output Format:
- respond with valid JSON
- no backticks, no code blocks!!
- example: { "startLine": 1, "endLine": 3, "name": "foo" }

## Examples
### Input:
\`\`\`ts
1   const fizzbuzz = () => {
2       for (let i = 1; i <= 100; i++) {
3           let output = "";
4           if (i % 3 === 0) output += "Fizz";
5           if (i % 5 === 0) output += "Buzz";
6           console.log(output || i);
7       }
8   }
\`\`\`

### Output:
{ "startLine": 3, "endLine": 5, "name": "getFizzbuzzString" }

## Code:
${codeWithLineNumbers}
`;

const removeSurroundingCodeBlocks = (text: string): string => {
  if (text.startsWith("```")) {
    return text.slice(text.indexOf("\n") + 1);
  }
  return text;
};

const gptExtractOneFunction = async ({
  codeWithLineNumbers,
  log,
}: {
  codeWithLineNumbers: string;
  log: Log;
}): Promise<{ startLine: number; endLine: number; name: string }> =>
  JSON.parse(
    removeSurroundingCodeBlocks(
      await callGPT({
        prompt: extractOneFunctionPrompt({ codeWithLineNumbers }),
        log,
      })
    )
  );

export const handleExtractOneFunction = async () => {
  if (!vscode.window.activeTextEditor) {
    return;
  }
  const { log } = createOutputChannel({ name: "gptedit.extractOneFunction" });

  const editor = vscode.window.activeTextEditor!;
  const document = editor.document;
  const codeWithLineNumbers = document
    .getText()
    .split("\n")
    .map((line, i) => `${`${i + 1}`.padEnd(4, " ")} ${line}`)
    .join("\n");

  const { startLine, endLine, name } = await gptExtractOneFunction({
    codeWithLineNumbers,
    log,
  });

  const start = new vscode.Position(startLine - 1, 0);
  const end = new vscode.Position(endLine, 0);
  const range = new vscode.Range(start, end);
  editor.selection = new vscode.Selection(start, end);
  editor.revealRange(range);

  const lines = editor.selection.end.line - editor.selection.start.line;

  await expand();

  await sleep(100);

  const newLines = editor.selection.end.line - editor.selection.start.line;

  log({ lines, newLines });

  if (newLines > lines + 1) {
    // await vscode.commands.executeCommand("editor.action.smartSelect.shrink");
  }

  log({
    refactor: await vscode.commands.executeCommand("editor.action.refactor"),
  });
  await sleep(100);
  //   get code actions

  //   const availableCommands = await vscode.commands.getCommands(false);

  //   for (const command of availableCommands) {
  //     if (
  //       /codeaction/i.test(command) ||
  //       /refactor/i.test(command) ||
  //       /extract/i.test(command) ||
  //       /action/i.test(command)
  //     ) {
  //       log({ command });
  //     }
  //   }

  //   editor.action.codeAction
  //   await vscode.commands.executeCommand("editor.action.codeAction");

  log({
    next: await vscode.commands.executeCommand("selectNextCodeAction"),
  });
  await sleep(100);
  log({
    accept: await vscode.commands.executeCommand("acceptSelectedCodeAction"),
  });

  await sleep(100);

  await renameTo({ newName: name });
  //   await sleep(1000);
  //   enter text for function name
  //   await renameTo({ newName: name });

  //   const commands = await vscode.commands.executeCommand(
  //     "vscode.executeCodeActionProvider",
  //     document.uri,
  //     range,
  //     "refactor.extract.function",
  //     1
  //   );
  //   get action

  //   vscode.executeCodeActionProvider - Execute code action provider.
  // vscode.executeCodeActionProvider - Execute code action provider.

  // uri - Uri of a text document
  // rangeOrSelection - Range in a text document. Some refactoring provider requires Selection object.
  // kind - (optional) Code action kind to return code actions for
  // itemResolveCount - (optional) Number of code actions to resolve (too large numbers slow down code actions)
  // (returns) - A promise that resolves to an array of Command-instances.

  //   log({
  //     exec: commands,
  //   });

  //   const action = await vscode.commands.executeCommand(commands![1], name);
};
