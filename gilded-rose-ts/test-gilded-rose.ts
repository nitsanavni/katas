import { Item, updateQuality } from "./gilded-rose";

let item: Item = { name: "name", sellIn: 1, quality: 1 };

const before = `${item.name} ${item.sellIn} ${item.quality}`;

updateQuality([item]);

const after = `${item.name} ${item.sellIn} ${item.quality}`;

console.log(`${before} -> ${after}`);
