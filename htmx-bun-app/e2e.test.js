import { test, expect } from "@playwright/test";

test("home page displays title", async ({ page }) => {
    await page.goto("http://localhost:3000");
    const title = await page.textContent("h1");
    expect(title).toBe("htmx Bun Chat App");
});

test("sending a message adds it to the messages container", async ({
    page,
}) => {
    await page.goto("http://localhost:3000");

    await page.fill("input[name='message']", "Hello, htmx!");
    await page.click("button[type='submit']");

    await page.waitForSelector("#messages div:last-child");
    const lastMessage = await page.$eval(
        "#messages div:last-child",
        (el) => el.textContent
    );
    expect(lastMessage).toBe("Hello, htmx!");
});
