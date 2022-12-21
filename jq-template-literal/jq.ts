import { readableStreamToText, spawn } from "bun";

export const jq = (strings, ...values) => {
    const jqCode = String.raw({ raw: strings }, ...values);

    return async (input: any) =>
        JSON.parse(
            await readableStreamToText(
                (
                    await spawn({
                        cmd: [
                            "sh",
                            "-c",
                            `echo '${JSON.stringify(input)}' | jaq '${jqCode}'`,
                        ],
                    })
                ).stdout!
            )
        );
};

export default jq;
