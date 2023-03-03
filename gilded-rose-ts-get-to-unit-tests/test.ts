import { GildedRose } from "./gilded-rose.js";

const item = { name: "an item", sellIn: 0, quality: 0 };
console.log(item);
new GildedRose([item]).updateQuality();
console.log(item);
