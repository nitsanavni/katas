#include <stdio.h>

#include "./GildedRose.h"

int main() {
  Item item;
  init_item(&item, "name", 0, 0);

  printf("%s %d %d\n", item.name, item.sellIn, item.quality);
}