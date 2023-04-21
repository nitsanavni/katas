import { test, expect } from "@playwright/test";

test("home page displays title", async ({ page }) => {
    await page.goto("http://localhost:3000");
    const title = await page.textContent("h1");
    expect(title).toBe("htmx Bun App");
});
