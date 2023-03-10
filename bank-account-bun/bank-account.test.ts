import { expect, test } from "bun:test";
import { driver } from "./bank-account-driver.js";

type Account = {
    printStatement: () => void;
};

test("empty statement", async () => {
    expect(await driver().printStatement()).toEqual("an expected result");
});
