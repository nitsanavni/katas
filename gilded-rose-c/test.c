#include <stdio.h>

#include "./GildedRose.h"

int main() {
  Item item;
  update_quality(&item, 0);

  const char *names[] = {"name", "Aged Brie",
                         "Backstage passes to a TAFKAL80ETC concert",
                         "Sulfuras, Hand of Ragnaros"};
  const int sellIns[] = {-1, 0, 11};
  const int qualities[] = {0, 1, 49, 50};

  for (const char **name = names; name < names + 4; name++) {
    printf("%s\n", *name);

    for (const int *sellIn = sellIns; sellIn < sellIns + 3; sellIn++) {
      for (const int *quality = qualities; quality < qualities + 4; quality++) {
        init_item(&item, *name, *sellIn, *quality);

        printf("%d %d -> ", item.sellIn, item.quality);
        update_quality(&item, 1);
        printf("%d %d\n", item.sellIn, item.quality);
      }
    }

    printf("\n");
  }
}