import { Item, updateQuality } from "./gilded-rose";
import product from "./product";

product(
    [
        "name",
        "Aged Brie",
        "Backstage passes to a TAFKAL80ETC concert",
        "Sulfuras, Hand of Ragnaros",
    ],
    [1, 0, 11, -1, 6],
    [1, 50, 0, 49]
).forEach(([name, sellIn, quality]) => {
    let item: Item = { name, sellIn, quality };

    const before = `${item.name} ${item.sellIn} ${item.quality}`;

    updateQuality([item]);

    const after = `${item.name} ${item.sellIn} ${item.quality}`;

    console.log(`${before} -> ${after}`);
});
