import { file, serve } from "bun";

const ejs = require("ejs");

const renderEjs = async (templatePath: string) => {
    const template = await file(templatePath).text();

    return ejs.render(template);
};

serve({
    async fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === "/") {
            const html = await renderEjs("views/index.ejs");
            return new Response(html, {
                headers: { "Content-Type": "text/html" },
            });
        }

        if (url.pathname === "/messages" && req.method === "POST") {
            const formData = await req.formData();
            const message = formData.get("message");
            return new Response(`<div>${message}</div>`, {
                headers: { "Content-Type": "text/html" },
            });
        }

        return new Response(`Bun!`);
    },
});
