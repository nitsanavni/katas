import { Item, updateQuality } from "./gilded-rose";
import product from "./product";

product(["name"], [1], [1]).forEach(([name, sellIn, quality]) => {
    let item: Item = { name, sellIn, quality };

    const before = `${item.name} ${item.sellIn} ${item.quality}`;

    updateQuality([item]);

    const after = `${item.name} ${item.sellIn} ${item.quality}`;

    console.log(`${before} -> ${after}`);
});
