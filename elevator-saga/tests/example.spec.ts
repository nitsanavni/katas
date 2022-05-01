import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://play.elevatorsaga.com/");
});

const speedUp = async ({ page }) => {
  const fibonacciExpectedSpeed = (() => {
    let prev = 1;
    let speed = 1;
    const maxSpeed = 55;

    return () => {
      const newSpeed = prev + speed;
      prev = speed;
      speed = newSpeed;

      return Math.min(speed, maxSpeed);
    };
  })();

  const speedIndicator = () => page.locator(".challenge > h3 > span");

  for (let i = 0; i < 10; i++) {
    expect(await speedIndicator()).toHaveText(`${fibonacciExpectedSpeed()}x`);
    await page.click(".timescale_increase");
    await page.waitForLoadState("domcontentloaded");
  }
};

const startChallengeRun = async ({ page }) => {
  const button = () => page.locator(".challenge > button");
  expect(await button()).toHaveText("Start");
  await button().click();
  expect(await button()).toHaveText("Pause");
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const waitFor = async (predicate: () => Promise<boolean>) => {
  while (!(await predicate())) {
    await sleep(100);
  }
};

const waitForChallengeToComplete = async ({ page }: { page: Page }) => {
  const button = () => page.locator(".challenge > button");
  await waitFor(async () => (await button().textContent()).includes("Restart"));
};

const challengeRunOutcome = async ({ page }: { page: Page }) => {
  const feedback = (await page.locator(".feedback > h2").allInnerTexts())[0];

  return /failed/.test(feedback) ? "failed" : "succeeded";
};

const addGoToFloor2 = async ({ page }: { page: Page }) => {
  const line9 = page.locator(
    "div.CodeMirror-code > div:nth-child(9) > pre > span"
  );

  await line9.click();
  await page.keyboard.press("End");
  await line9.type("elevator.goToFloor(2);");
  await page.screenshot({ path: "./screenshot3.png" });
  await page.locator('text="Apply"').click();
};

test("go to floor 2", async ({ page }) => {
  await speedUp({ page });
  await addGoToFloor2({ page });
  // await startChallengeRun({ page });
  await waitForChallengeToComplete({ page });
  expect(await challengeRunOutcome({ page })).toEqual("succeeded");
});

test("speed up, start, and fail", async ({ page }) => {
  await speedUp({ page });
  await startChallengeRun({ page });
  await waitForChallengeToComplete({ page });
  expect(await challengeRunOutcome({ page })).toEqual("failed");
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
