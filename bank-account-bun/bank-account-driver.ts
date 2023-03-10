import { spawn } from "bun";

type Opts = { showArgv?: boolean };

export const driver = (opts: Opts = {}) => {
    const printStatement = () =>
        new Response(
            spawn({
                cmd: ["bun", "cli.ts", "printStatement"],
                ...(opts.showArgv ? { env: { SHOW_ARGV: "true" } } : {}),
            }).stdout
        ).text();

    return { printStatement };
};
