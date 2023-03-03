export type Item = { name: string; sellIn: number; quality: number };

export class GildedRose {
    constructor(private items: Item[]) {}

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            updateItem(this.items[i]);
        }

        return this.items;
    }
}

function updateItem(item: Item) {
    if (isRegularItem(item)) {
        updateRegularItem(item);
    } else if (item.name == "Aged Brie") {
        updateBrie(item);
    } else if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        updateBackstage(item);
    } else if (item.name == "Sulfuras, Hand of Ragnaros") {
        updateSulfuras(item);
    }
}

const specialItems = [
    "Aged Brie",
    "Backstage passes to a TAFKAL80ETC concert",
    "Sulfuras, Hand of Ragnaros",
] as const;

function isRegularItem(item: Item) {
    return !specialItems.includes(item.name as any);
}

function updateSulfuras(_item: Item) {
    // do nothing
}

function updateBackstage(item: Item) {
    improveQuality(item);
    if (item.sellIn < 11) {
        improveQuality(item);
    }
    if (item.sellIn < 6) {
        improveQuality(item);
    }
    decreaseSellIn(item);
    if (item.sellIn < 0) {
        resetQuality(item);
    }
}

function updateBrie(item: Item) {
    improveQuality(item);
    decreaseSellIn(item);
    if (item.sellIn < 0) {
        improveQuality(item);
    }
}

function updateRegularItem(item: Item) {
    degradeQuality(item);
    decreaseSellIn(item);
    if (item.sellIn < 0) {
        degradeQuality(item);
    }
}

function decreaseSellIn(item: Item) {
    item.sellIn = item.sellIn - 1;
}

function resetQuality(item: Item) {
    item.quality = 0;
}

function degradeQuality(item: Item) {
    if (item.quality > 0) {
        item.quality = item.quality - 1;
    }
}

function improveQuality(item: Item) {
    if (item.quality < 50) {
        item.quality = item.quality + 1;
    }
}
