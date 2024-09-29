from gilded_rose import GildedRose, Item


def main():
    items = [
        Item("Aged Brie", 5, 10),
        Item("Sulfuras, Hand of Ragnaros", 0, 80),
        Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        Item("Regular Item", 10, 20)
    ]
    gilded_rose = GildedRose(items)

    print("Before update:")
    for item in items:
        print(item)

    gilded_rose.update_quality()

    print("\nAfter update:")
    for item in items:
        print(item)


if __name__ == "__main__":
    main()
