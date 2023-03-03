import { GildedRose } from "./gilded-rose.js";

const l = console.log;

l("gilded rose unit tests");

const test = (description: string, testCb: () => void) => {
    l(`test: ${description}`);
    testCb();
    l();
};

test("updates all items in the given items array", () => {
    const items = [
        { name: "item 1", sellIn: 0, quality: 0 },
        { name: "item 2", sellIn: 2, quality: 2 },
    ];
    l(items);
    new GildedRose(items).updateQuality();
    l(items);
});
