#include <stdio.h>

#include "./GildedRose.h"

int main() {
  Item item;
  update_quality(&item, 0);

  const char *names[] = {"name", "Aged Brie",
                         "Backstage passes to a TAFKAL80ETC concert"};
  const int sellIns[] = {0};
  const int qualities[] = {0};

  for (const char **name = names; name < names + 3; name++) {
    printf("%s\n", *name);

    for (const int *sellIn = sellIns; sellIn < sellIns + 1; sellIn++) {
      for (const int *quality = qualities; quality < qualities + 1; quality++) {
        init_item(&item, *name, *sellIn, 0);

        printf("%d %d -> ", item.sellIn, item.quality);
        update_quality(&item, 1);
        printf("%d %d\n", item.sellIn, item.quality);
      }
    }
  }
}