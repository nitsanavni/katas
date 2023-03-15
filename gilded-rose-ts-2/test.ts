import { Item, GildedRose } from "./gilded-rose.js";

// each day - each `update` the quality degrades by 1;
//            only if greater than 0
//            (what happens if we start it with negative Q?)
// each day - the sell-in is decremented by 1, the sellIn represents days until...
// after the sell-in is reached - quality degrades twice as fast - by 2 each day
// there are also special item: with very specific names
// items are identified by item.name - an exact match
// sulfuras never changes
// brie - quality **improves** every day;
//        and twice as fast after sell-in
//        only if less than 50
//        (what happens if we start it off with greater than 50?)
// backstage - the more the sell-in approaches the fastest the quality rises;
//             but once it's reached - quality goes to zero

console.log("the following is for coverage");

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
