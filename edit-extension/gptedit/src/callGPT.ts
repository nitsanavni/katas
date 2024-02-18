import OpenAI from "openai";

import { Log } from ".";

export const callGPT = async ({
  prompt,
  log = (x) => x,
}: {
  prompt: string;
  log?: Log;
}): Promise<string> => {
  const model = "gpt-4-1106-preview";
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

  log(response.choices[0].message.content);

  return response.choices[0].message.content!;
};
