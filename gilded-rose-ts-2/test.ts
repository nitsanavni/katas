import { Item, GildedRose } from "./gilded-rose";

const names = [
    "name",
    "Aged Brie",
    "Backstage passes to a TAFKAL80ETC concert",
    "Sulfuras, Hand of Ragnaros",
];
for (const name of names) {
    for (const sellIn of [0, -1, 1, 11, 6]) {
        for (const quality of [0, 1, 49, 50]) {
            const item = new Item(name, sellIn, quality);
            const before = JSON.stringify(item);
            new GildedRose([item]).updateQuality();
            console.log(before + JSON.stringify(item));
        }
    }
}
