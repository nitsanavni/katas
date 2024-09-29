import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from gilded_rose import GildedRose, Item  # noqa: E402


def main():
    names = [
        "Aged Brie",
        "Sulfuras, Hand of Ragnaros",
        "Backstage passes to a TAFKAL80ETC concert",
        "Regular Item",
        "Conjured Item",
        "Legendary Item",  # Added for more coverage
        "Invalid Item"  # Added for edge case testing
    ]
    sell_in_values = [10, 0, -1, 6, 15, 5, -5]  # Extended sell_in values
    qualities = [10, 0, 50, 1, 49, 30]  # Extended quality values

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
