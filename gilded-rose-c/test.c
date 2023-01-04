#include <stdio.h>

#include "./GildedRose.h"

#define S(array) (sizeof(array) / sizeof((array)[0]))
#define E(array) (array + S(array))

int main() {
  Item item;
  update_quality(&item, 0);

  const char *names[] = {"name", "Aged Brie",
                         "Backstage passes to a TAFKAL80ETC concert",
                         "Sulfuras, Hand of Ragnaros"};
  const int sellIns[] = {-1, 0, 11};
  const int qualities[] = {0, 1, 49, 50};

  for (const char **name = names; name < E(names); name++) {
    printf("%s\n", *name);

    for (const int *sellIn = sellIns; sellIn < E(sellIns); sellIn++) {
      for (const int *quality = qualities; quality < E(qualities); quality++) {
        init_item(&item, *name, *sellIn, *quality);

        printf("%d %d -> ", item.sellIn, item.quality);
        update_quality(&item, 1);
        printf("%d %d\n", item.sellIn, item.quality);
      }
    }

    printf("\n");
  }
}