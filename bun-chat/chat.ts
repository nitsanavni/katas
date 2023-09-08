export const chat = async (query: string): Promise<string> => {
    const api_key = Bun.env.OPENAI_API_KEY;

    if (!api_key) {
        throw new Error(
            "Couldn't find the 'OPENAI_API_KEY' environment variable!"
        );
    }

    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
    };
    const data = {
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: query },
        ],
    };

    const response = await Bun.fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: headers,
    });

    if (response.ok) {
        const responseData = await response.json();
        return responseData["choices"][0]["message"]["content"];
    } else {
        throw new Error(
            `Request to GPT-4 API failed with status ${
                response.status
            }. The response is: ${await response.text()}`
        );
    }
};

if ((import.meta as any).path === Bun.main) {
    const query = Bun.argv.slice(2).join(" ");
    chat(query)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`);
        });
}
