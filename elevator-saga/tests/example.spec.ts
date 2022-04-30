import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://play.elevatorsaga.com/");
  await page.waitForLoadState("domcontentloaded");
});

test("sanity - can reach site, sees first elevator challenge", async ({
  page,
}) => {
  await page.screenshot({ path: "./1.png" });
  expect((await page.locator("h3").allTextContents())[0]).toMatch(
    "Challenge #1"
  );
});
