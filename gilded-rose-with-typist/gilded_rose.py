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
            if item.sell_in < 0:
                self.handle_expired_item(item)

    def update_aged_brie(self, item):
        if item.quality < 50:
            item.quality += 1

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
        # Ensure the quality does not exceed 50 during regular updates
        if item.quality > 50 and item.sell_in < 1:
            item.quality += 1  # Allow quality to exceed if past sell_in and already maxed

    def update_regular_item(self, item):
        if item.quality > 0:
            item.quality -= 1

    def handle_expired_item(self, item):
        if item.name != "Aged Brie":
            if item.name != "Backstage passes to a TAFKAL80ETC concert":
                if item.quality > 0:
                    item.quality -= 1
            else:
                item.quality = 0  # Quality drops to 0 after the concert
        else:
            if item.quality < 50:
                item.quality += 1


class Item:
    def __init__(self, name, sell_in, quality):
        self.name = name
        self.sell_in = sell_in
        self.quality = quality

    def __repr__(self):
        return "%s, %s, %s" % (self.name, self.sell_in, self.quality)
