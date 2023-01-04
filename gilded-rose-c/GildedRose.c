#include "GildedRose.h"
#include <stdio.h>
#include <string.h>

Item *init_item(Item *item, const char *name, int sellIn, int quality) {
  item->sellIn = sellIn;
  item->quality = quality;
  item->name = strdup(name);

  return item;
}

extern char *print_item(char *buffer, Item *item) {
  sprintf(buffer, "%s, %d, %d", item->name, item->sellIn, item->quality);
  return buffer;
}

void update_regular_item(Item *item) {
  if (item->quality > 0) {
    item->quality = item->quality - 1;
  }

  item->sellIn = item->sellIn - 1;

  if (item->sellIn < 0) {
    if (item->quality > 0) {
      item->quality = item->quality - 1;
    }
  }
}

void update_backstage(Item *item) {
  if (item->quality < 50) {
    item->quality = item->quality + 1;

    if (item->sellIn < 11) {
      if (item->quality < 50) {
        item->quality = item->quality + 1;
      }
    }

    if (item->sellIn < 6) {
      if (item->quality < 50) {
        item->quality = item->quality + 1;
      }
    }
  }

  item->sellIn = item->sellIn - 1;

  if (item->sellIn < 0) {
    item->quality = item->quality - item->quality;
  }
}
void update_brie(Item *item) {
  if (item->quality < 50) {
    item->quality = item->quality + 1;
  }

  item->sellIn = item->sellIn - 1;

  if (item->sellIn < 0) {
    if (item->quality < 50) {
      item->quality = item->quality + 1;
    }
  }
}

int is_brie(Item *item) { return !strcmp(item->name, "Aged Brie"); }

int is_backstage(Item *item) {
  return !strcmp(item->name, "Backstage passes to a TAFKAL80ETC concert");
}

void update_item(Item *item) {
  if (is_brie(item)) {
    update_brie(item);
  } else if (is_backstage(item)) {
    update_backstage(item);
  } else if (!strcmp(item->name, "Sulfuras, Hand of Ragnaros")) {
    // do nothing!
  } else {
    update_regular_item(item);
  }
}

void update_quality(Item items[], int size) {
  for (Item *item = items; item < items + size; item++) {
    update_item(item);
  }
}
