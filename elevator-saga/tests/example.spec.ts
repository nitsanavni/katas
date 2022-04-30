import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://play.elevatorsaga.com/");
});

test("speed up, start, and fail", async ({ page }) => {
  expect(await page.locator(".challenge > h3 > span")).toHaveText("2x");
  await page.click(".timescale_increase");
});

test("sanity - can reach site, sees first elevator challenge", async ({
  page,
}) => {
  expect(await page.title()).toBe(
    "Elevator Saga - the elevator programming game"
  );
  expect((await page.locator("h3").allTextContents())[0]).toMatch(
    "Challenge #1"
  );
});
