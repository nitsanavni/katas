# -*- coding: utf-8 -*-

class GildedRose(object):

    def __init__(self, items):
        self.items = items

    def update_quality(self):
        for item in self.items:
            if item.name == "Aged Brie":
                self.update_aged_brie(item)
            elif item.name == "Sulfuras, Hand of Ragnaros":
                continue  # Sulfuras does not need to be updated
            elif item.name == "Backstage passes to a TAFKAL80ETC concert":
                self.update_backstage_pass(item)
            else:
                self.update_regular_item(item)

            item.sell_in -= 1

    def update_aged_brie(self, item):
        if item.quality < 50:
            item.quality += 1

        # Handle expiration logic for Aged Brie
        if item.sell_in < 0 and item.quality < 50:
            item.quality += 1  # Quality increases after expiration

    def update_backstage_pass(self, item):
        if item.quality < 50:
            item.quality += 1
            if item.sell_in < 11:
                if item.quality < 50:
                    item.quality += 1
            if item.sell_in < 6:
                if item.quality < 50:
                    item.quality += 1

        # Quality drops to 0 after the concert
        if item.sell_in < 0:
            item.quality = 0

    def update_regular_item(self, item):
        if item.quality > 0:
            item.quality -= 1

        # Handle expiration logic for regular items
        if item.sell_in < 0 and item.quality > 0:
            item.quality -= 1


class Item:
    def __init__(self, name, sell_in, quality):
        self.name = name
        self.sell_in = sell_in
        self.quality = quality

    def __repr__(self):
        return "%s, %s, %s" % (self.name, self.sell_in, self.quality)
