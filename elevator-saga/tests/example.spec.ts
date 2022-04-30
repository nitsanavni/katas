import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://play.elevatorsaga.com/");
});

test("speed up, start, and fail", async ({ page }) => {
  const fibonacciExpectedSpeed = (() => {
    let prev = 1;
    let speed = 1;
    const max = 55;

    return () => {
      const newSpeed = prev + speed;
      prev = speed;
      speed = newSpeed;

      return Math.min(speed, max);
    };
  })();

  const speedIndicator = () => page.locator(".challenge > h3 > span");

  for (let i = 0; i < 10; i++) {
    expect(await speedIndicator()).toHaveText(`${fibonacciExpectedSpeed()}x`);
    await page.click(".timescale_increase");
    await page.waitForLoadState("domcontentloaded");
  }
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
