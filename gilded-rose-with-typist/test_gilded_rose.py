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
        "Invalid Item",  # Added for edge case testing
        "Rare Item",  # New item to check additional behavior
        "Standard Item",  # New item to check baseline behavior
        "Test Item 1",  # Additional test case
        "Test Item 2",  # Additional test case
    ]
    sell_in_values = [10, 0, -1, 6, 15, 5, -5, 1,
                      3, -10, 11, 2]  # Extended sell_in values
    # Extended quality values to cover edge cases
    # Added to ensure comprehensive coverage
    qualities = [10, 0, 50, 1, 49, 30, 5, 2, 48, 51, 10, 12, 15]

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
