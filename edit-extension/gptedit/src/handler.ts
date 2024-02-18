import * as vscode from "vscode";
import { execSync } from "child_process";

import {
  callGPT,
  renameTo,
  expand,
  select,
  promptToSelectTool,
  promptToEditByReplacingSelection,
  replaceSelectionWith,
  shrink,
  createOutputChannel,
  goToLine,
  indent,
  readCurrentFile,
} from ".";

export const handler = async (editToCode?: string) => {
  if (!vscode.window.activeTextEditor) return;

  const { selectedFile, fileContentWithMarkers } = readCurrentFile();

  if (!editToCode) {
    editToCode = await vscode.window.showInputBox({
      prompt: "Edit to perform",
      value: "Edit to perform",
    });
  }

  if (!editToCode) {
    return;
  }

  const { log } = createOutputChannel();

  if (/\/exec .+$/.test(editToCode)) {
    const cmd = /\/exec (.+)$/.exec(editToCode)![1];

    const cwd = vscode.workspace.workspaceFolders![0].uri.fsPath;

    const stdout = execSync(cmd, { cwd }).toString();

    const execsFile = ".execs.json";

    try {
      await vscode.workspace.fs.stat(vscode.Uri.file(`${cwd}/.execs.json`));
    } catch (e) {
      await vscode.workspace.fs.writeFile(
        vscode.Uri.file(`${cwd}/${execsFile}`),
        new Uint8Array(Buffer.from("[]"))
      );
    }

    const execs = JSON.parse(
      Buffer.from(
        await vscode.workspace.fs.readFile(
          vscode.Uri.file(`${cwd}/${execsFile}`)
        )
      ).toString()
    );

    execs.push({
      cmd,
      stdout,
      time: new Date().toISOString(),
    });

    await vscode.workspace.fs.writeFile(
      vscode.Uri.file(`${cwd}/${execsFile}`),
      new Uint8Array(Buffer.from(JSON.stringify(execs)))
    );

    log({ cmd, stdout });

    return stdout;
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
    const lineMatch = /\/indent:(\d+)/gi.exec(editToCode);

    if (lineMatch) {
      goToLine({ line: parseInt(lineMatch[1], 10) });
    }

    indent();
    return;
  }

  if (/\/expand:\d+/gi.test(editToCode)) {
    const expandTimes = /\/expand:(\d+)/gi.exec(editToCode);

    await expand({ times: parseInt(expandTimes![1], 10) });

    return;
  }

  if (/\/shrink:\d+/gi.test(editToCode)) {
    const shrinkTimes = /\/shrink:(\d+)/gi.exec(editToCode);

    await shrink({ times: parseInt(shrinkTimes![1], 10) });

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
};
