export class Item {
    constructor(public name, public sellIn, public quality) {}
}

const wrapper = (item: Item) => ({
    decQuality: () => item.quality > 0 && item.quality--,
    decSellIn: () => item.sellIn--,
});

abstract class ItemWrapper {
    private readonly w: ReturnType<typeof wrapper>;

    constructor(private readonly item: Item) {
        this.w = wrapper(item);
    }

    protected decQuality() {
        this.decQuality();
    }

    protected incQuality() {
        this.item.quality < 50 && this.item.quality++;
    }

    protected resetQuality() {
        this.item.quality = 0;
    }

    private decSellIn() {
        this.w.decSellIn();
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

const Default = (item: Item) => {
    const { decQuality, decSellIn } = wrapper(item);

    const preSellDate = () => {
        decQuality();
    };

    const postSellDate = () => {
        decQuality();
        decQuality();
    };

    return {
        update: () => {
            decSellIn();
            if (item.sellIn < 0) {
                postSellDate();
            } else {
                preSellDate();
            }
        },
    };
};

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
