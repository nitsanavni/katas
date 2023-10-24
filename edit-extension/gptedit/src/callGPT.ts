import OpenAI from "openai";

export const callGPT = async ({ prompt }: { prompt: string }) => {
    const model = "gpt-4";
    const messages = [
        {
            role: "user" as const,
            content: prompt,
        },
    ];

    const response = await new OpenAI().chat.completions.create({
        model,
        messages,
    });

    return response.choices[0].message.content;
};
