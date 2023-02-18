export class Item {
    constructor(public name, public sellIn, public quality) {}
}

abstract class ItemWrapper {
    constructor(private readonly item: Item) {}

    protected decQuality() {
        this.item.quality > 0 && this.item.quality--;
    }

    protected incQuality() {
        this.item.quality < 50 && this.item.quality++;
    }

    protected resetQuality() {
        this.item.quality = 0;
    }

    private decSellIn() {
        this.item.sellIn--;
    }

    protected get sellIn() {
        return this.item.sellIn;
    }

    public update() {
        this.updateTemplate();
    }

    protected sellDatePassedUpdate() {}
    protected sellUpdate() {}

    protected updateTemplate() {
        this.decSellIn();

        if (this.item.sellIn < 0) {
            this.sellDatePassedUpdate();
        } else {
            this.sellUpdate();
        }
    }
}

const Default = (item: Item) => ({
    update: () => {
        item.sellIn--;
        if (item.sellIn < 0) {
            item.quality > 0 && item.quality--;
            item.quality > 0 && item.quality--;
        } else {
            item.quality > 0 && item.quality--;
        }
    },
});

class Sulfuras extends ItemWrapper {
    protected updateTemplate() {
        // do nothing
    }
}

class Backstage extends ItemWrapper {
    protected sellDatePassedUpdate(): void {
        this.resetQuality();
    }

    protected sellUpdate(): void {
        if (this.sellIn < 5) {
            this.incQuality();
            this.incQuality();
            this.incQuality();
        } else if (this.sellIn < 10) {
            this.incQuality();
            this.incQuality();
        } else {
            this.incQuality();
        }
    }
}

class Brie extends ItemWrapper {
    protected sellDatePassedUpdate(): void {
        this.incQuality();
        this.incQuality();
    }

    protected sellUpdate(): void {
        this.incQuality();
    }
}

export class GildedRose {
    constructor(private items = [] as Array<Item>) {}

    updateQuality() {
        this.items.map(wrap).forEach((item) => item.update());

        function wrap(item: Item) {
            return (
                {
                    "Aged Brie": new Brie(item),
                    "Backstage passes to a TAFKAL80ETC concert": new Backstage(
                        item
                    ),
                    "Sulfuras, Hand of Ragnaros": new Sulfuras(item),
                }[item.name] || Default(item)
            );
        }
    }
}
