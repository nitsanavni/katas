import { env, file, spawn, write } from "bun";
import { expect, test as bunTest } from "bun:test";

export type ExecutableCommand = {
    command: () => string;
    execute: (command: string) => Promise<string>;
};

export const approval = (baseName: string) => {
    const approvedFilePath = () => `${baseName}.approved`;
    const receivedFilePath = () => `${baseName}.received`;
    const approvedFile = () => file(approvedFilePath());

    const approvedText = async (): Promise<string> => {
        const f = approvedFile();

        if (f.size == 0) {
            await write(f, "");
            return "";
        }

        return f.text();
    };

    const update = (received: string) => write(approvedFile(), received);

    const executeDiffTool = (
        receivedFilePath: string,
        approvedFilePath: string
    ) => {
        spawn(["code", "--diff", receivedFilePath, approvedFilePath]);
    };

    const logCommandResults = async (
        command: ExecutableCommand,
        approvedCommand: string,
        receivedCommand: string
    ) => {
        const [approvedResult, receivedResult] = await Promise.all([
            command.execute(approvedCommand),
            command.execute(receivedCommand),
        ]);

        const approvedResultFilePath = `${baseName}-approved-result`;
        const receivedResultFilePath = `${baseName}-received-result`;

        await write(file(approvedResultFilePath), approvedResult);
        await write(file(receivedResultFilePath), receivedResult);

        spawn([
            "code",
            "--diff",
            receivedResultFilePath,
            approvedResultFilePath,
        ]);
    };

    const verify = async (received: ExecutableCommand | string) => {
        const receivedCommand =
            typeof received === "string" ? received : received.command();
        const approvedCommand = await approvedText();

        if (env.UPDATE) {
            await update(receivedCommand);
        } else {
            if (approvedCommand != receivedCommand) {
                await write(receivedFilePath(), receivedCommand);
                executeDiffTool(receivedFilePath(), approvedFilePath());

                if (typeof received !== "string") {
                    await logCommandResults(
                        received,
                        approvedCommand,
                        receivedCommand
                    );
                }

                expect(receivedCommand).toEqual(approvedCommand);
            }
        }
    };

    return { verify };
};

type Received = ExecutableCommand | Promise<string> | string;

export const test = (label: string, test: () => Received) =>
    bunTest(label, async () => approval(label).verify(await test()));
