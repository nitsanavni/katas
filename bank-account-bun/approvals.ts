import { env, file, write } from "bun";
import { expect } from "bun:test";

export const approval = (baseName: string) => {
    const approvedFile = () => file(`${baseName}.approved`);

    const approvedText = async (): Promise<string> => {
        const f = approvedFile();

        return f.size == 0 ? "" : await f.text();
    };

    const update = (received: string) => write(approvedFile(), received);

    const verify = async (received: string) => {
        if (env.UPDATE) {
            await update(received);
        } else {
            expect(await approvedText()).toEqual(received);
        }
    };

    return { verify };
};
