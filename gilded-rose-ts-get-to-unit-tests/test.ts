import { GildedRose } from "./gilded-rose.js";

for (const name of [
    // "an item",
    "Aged Brie",
    "Backstage passes to a TAFKAL80ETC concert",
    "Sulfuras, Hand of Ragnaros",
]) {
    for (const sellIn of [-1, 0, 1, 6, 11]) {
        for (const quality of [0, 49, 50]) {
            const item = { name, sellIn, quality };
            console.log(item);
            new GildedRose([item]).updateQuality();
            console.log(item);
        }
    }
}
