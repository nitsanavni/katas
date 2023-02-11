export class Item {
    constructor(public name, public sellIn, public quality) {}
}

abstract class ItemWrapper {
    constructor(protected readonly item: Item) {}

    protected decQuality() {
        this.item.quality > 0 && this.item.quality--;
    }

    protected incQuality() {
        this.item.quality < 50 && this.item.quality++;
    }

    public abstract update();
}

class Default extends ItemWrapper {
    public update() {
        this.decQuality();

        this.item.sellIn--;

        if (this.item.sellIn < 0) {
            this.decQuality();
        }
    }
}

class Sulfuras extends ItemWrapper {
    public update() {
        // do nothing
    }
}

class Backstage extends ItemWrapper {
    public update() {
        this.incQuality();

        if (this.item.sellIn < 11) {
            this.incQuality();
        }

        if (this.item.sellIn < 6) {
            this.incQuality();
        }

        this.item.sellIn--;

        if (this.item.sellIn < 0) {
            this.item.quality = 0;
        }
    }
}

class Brie extends ItemWrapper {
    public update() {
        this.incQuality();

        this.item.sellIn--;

        if (this.item.sellIn < 0) {
            this.incQuality();
        }
    }
}

export class GildedRose {
    constructor(private items = [] as Array<Item>) {}

    updateQuality() {
        this.items.map(wrap).forEach((item) => item.update());

        function wrap(item: Item) {
            return new ({
                "Aged Brie": Brie,
                "Backstage passes to a TAFKAL80ETC concert": Backstage,
                "Sulfuras, Hand of Ragnaros": Sulfuras,
            }[item.name] || Default)(item);
        }
    }
}
