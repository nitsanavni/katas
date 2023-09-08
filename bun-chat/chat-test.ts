import { expect, test } from "bun:test";

import { chat } from "./chat.ts";

export const chatTest = async (statement: string): Promise<void> => {
    const prompt = `
you're a unit testing assertor

here's a statement:
---
${statement}
---

evaluate this statement for its truth value
example output: { "assessment": "...", "pass": true }
format: !!response should be valid JSON only, no extra text at all!!
    `;

    const response = await chat(prompt);

    const parsedResponse = JSON.parse(response);

    test(statement, () => {
        console.log(response);
        expect(parsedResponse.pass).toEqual(true, response);
    });
};
