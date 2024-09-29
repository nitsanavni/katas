import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from gilded_rose import GildedRose, Item  # noqa: E402


def main():
    names = ["Aged Brie", "Sulfuras, Hand of Ragnaros",
             "Backstage passes to a TAFKAL80ETC concert", "Regular Item"]
    sell_in_values = [5, 0, 15, 10]
    qualities = [10]

    items = []
    for name in names:
        for sell_in in sell_in_values:
            for quality in qualities:
                items.append(Item(name, sell_in, quality))

    gilded_rose = GildedRose(items)

    gilded_rose.update_quality()

    for item in items:
        print(item)


if __name__ == "__main__":
    main()
