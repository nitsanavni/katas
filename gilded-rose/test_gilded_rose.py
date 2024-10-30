from gilded_rose import (
    GildedRose,
    Item,
)


names = [
    "item",
    "more",
    "Aged Brie",
    "Backstage passes to a TAFKAL80ETC concert",
]

sell_ins = [0, 1]

qualities = [0, 1, 2]

items = [
    Item(name, sell_in, quality)
    for name in names
    for sell_in in sell_ins
    for quality in qualities
]

GildedRose(items).update_quality()

print("\n".join(map(str, items)))
