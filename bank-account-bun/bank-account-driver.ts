import { spawn } from "bun";

export const driver = () => {
    const printStatement = () =>
        new Response(
            spawn({ cmd: ["bun", "cli.ts", "printStatement"] }).stdout
        ).text();

    return { printStatement };
};
