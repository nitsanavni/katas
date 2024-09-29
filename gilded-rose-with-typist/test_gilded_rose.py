from gilded_rose import GildedRose, Item


def main():
    names = ["Aged Brie", "Sulfuras, Hand of Ragnaros",
             "Backstage passes to a TAFKAL80ETC concert", "Regular Item"]
    sell_in_values = [5, 0, 15, 10]
    qualities = [10, 80, 20, 20]

    items = [Item(name, sell_in, quality) for name, sell_in,
             quality in zip(names, sell_in_values, qualities)]
    gilded_rose = GildedRose(items)

    gilded_rose.update_quality()

    print("\nAfter update:")
    for item in items:
        print(item)


if __name__ == "__main__":
    main()
