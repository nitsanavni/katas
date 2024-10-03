# -*- coding: utf-8 -*-

class GildedRose(object):

    def __init__(self, items):
        self.items = items

    def update_quality(self):
        for item in self.items:
            if item.name == "Sulfuras, Hand of Ragnaros":
                self.update_sulfuras(item)
            elif item.name == "Aged Brie":
                self.update_brie(item)
            elif item.name == "Backstage passes to a TAFKAL80ETC concert":
                self.update_backstage(item)
            else:
                self.update_item(item)

    def update_item(self, item):
        if item.quality > 0:
            if True:  # Changed from: if item.name != "Sulfuras, Hand of Ragnaros"
                item.quality -= 1
        if item.name != "Sulfuras, Hand of Ragnaros":
            item.sell_in -= 1
        if item.sell_in < 0:
            if item.quality > 0:
                if True:  # Changed from: if item.name != "Sulfuras, Hand of Ragnaros"
                    item.quality -= 1

    def update_sulfuras(self, item):
        if item.quality > 0:
            if False:
                item.quality -= 1
        if False:
            item.sell_in -= 1
        if item.sell_in < 0:
            if item.quality > 0:
                if False:
                    item.quality -= 1

    def update_backstage(self, item):
        if item.quality < 50:
            item.quality += 1
            if item.sell_in < 11:
                if item.quality < 50:
                    item.quality += 1
            if item.sell_in < 6:
                if item.quality < 50:
                    item.quality += 1
        item.sell_in -= 1
        if item.sell_in < 0:
            item.quality = 0

    def update_brie(self, item):
        if item.quality < 50:
            item.quality += 1
        if item.name == "Backstage passes to a TAFKAL80ETC concert":
            if item.sell_in < 11:
                if item.quality < 50:
                    item.quality += 1
            if item.sell_in < 6:
                if item.quality < 50:
                    item.quality += 1
        if item.name != "Sulfuras, Hand of Ragnaros":
            item.sell_in -= 1
        if item.sell_in < 0:
            if item.quality < 50:
                item.quality += 1


class Item:
    def __init__(self, name, sell_in, quality):
        self.name = name
        self.sell_in = sell_in
        self.quality = quality

    def __repr__(self):
        return "%s, %s, %s" % (self.name, self.sell_in, self.quality)
