#include <stdio.h>

#include "./GildedRose.h"
#include "./jenny.h"

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

  for (const int(*j)[3] = jenny; j < E(jenny); j++) {
    init_item(&item, names[(*j)[0]], sellIns[(*j)[1]], qualities[(*j)[2]]);

    printf("%s %d %d -> ", item.name, item.sellIn, item.quality);
    update_quality(&item, 1);
    printf("%d %d\n", item.sellIn, item.quality);
  }
}