import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://play.elevatorsaga.com/");
});

test("sanity - can reach site, sees first elevator challenge", async ({
  page,
}) => {
  expect((await page.locator("h3").allTextContents())[0]).toMatch(
    "Challenge #1"
  );
});
