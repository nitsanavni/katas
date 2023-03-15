export class Item {
    constructor(
        public name: string,
        public sellIn: number,
        public quality: number
    ) {}
}

type Action = (item: Item) => void;

const decQuality: Action = (item) => item.quality > 0 && item.quality--;
const incQuality: Action = (item) => item.quality < 50 && item.quality++;

const times = (n: number, fn: () => void) =>
    Array.from({ length: n }).forEach(() => fn());

const template =
    ({ post, pre }: { post: Action; pre: Action }): Action =>
    (item: Item) => {
        item.sellIn--;
        if (item.sellIn < 0) {
            post(item);
        } else {
            pre(item);
        }
    };

const updateDefault = template({
    pre: decQuality,
    post: (item) => times(2, () => decQuality(item)),
});

const noop = () => {};
const updateSulfuras = noop;

const updateBackstage = template({
    post: (item) => (item.quality = 0),
    pre: (item) => {
        const inc = item.sellIn < 5 ? 3 : item.sellIn < 10 ? 2 : 1;
        times(inc, () => incQuality(item));
    },
});

const updateBrie = template({
    pre: incQuality,
    post: (item) => times(2, () => incQuality(item)),
});

const updateActionFor = (item: Item) =>
    ({
        "Aged Brie": updateBrie,
        "Backstage passes to a TAFKAL80ETC concert": updateBackstage,
        "Sulfuras, Hand of Ragnaros": updateSulfuras,
    }[item.name] || updateDefault);

export class GildedRose {
    constructor(private items = [] as Array<Item>) {}

    updateQuality() {
        this.items.forEach((item) => updateActionFor(item)(item));
    }
}
