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

test("regular item - quality degrades, sell-in decreases", () => {
    const items = [
        { name: "regular item", sellIn: 3, quality: 3 },
        { name: "regular item", sellIn: 1, quality: 4 },
    ];
    l(items);
    new GildedRose(items).updateQuality();
    l(items);
});

test("regular item - once sell-in reaches zero, quality degrades twice as fast", () => {
    const items = [
        { name: "regular item", sellIn: -3, quality: 3 },
        { name: "regular item", sellIn: 0, quality: 5 },
    ];
    l(items);
    new GildedRose(items).updateQuality();
    l(items);
});

test("regular item - quality does not degrade below zero", () => {
    const items = [
        { name: "regular item", sellIn: -3, quality: 0 },
        { name: "regular item", sellIn: 3, quality: 0 },
        { name: "regular item", sellIn: -3, quality: 1 },
        { name: "regular item", sellIn: 3, quality: -10 },
    ];
    l(items);
    new GildedRose(items).updateQuality();
    l(items);
});
