import { env, file, spawn, write } from "bun";
import { expect, test as bunTest } from "bun:test";

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

    const verify = async (received: string) => {
        if (env.UPDATE) {
            await update(received);
        } else {
            if ((await approvedText()) != received) {
                await write(receivedFilePath(), received);
                spawn([
                    "code",
                    "--diff",
                    receivedFilePath(),
                    approvedFilePath(),
                ]);
                expect(received).toEqual(await approvedText());
            }
        }
    };

    return { verify };
};

export const test = (
    label: string,
    t: (a: ReturnType<typeof approval>) => void | Promise<any>
) => bunTest(label, () => t(approval(label)));
