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
  // const int sellIns[] = {-1, 0, 11};
  // const int qualities[] = {0, 1, 49, 50};

  // for (const char **name = names; name < E(names); name++) {
  //   printf("%s\n", *name);

  //   for (const int *sellIn = sellIns; sellIn < E(sellIns); sellIn++) {
  //     for (const int *quality = qualities; quality < E(qualities); quality++)
  //     {
  //       init_item(&item, *name, *sellIn, *quality);

  //       printf("%d %d -> ", item.sellIn, item.quality);
  //       update_quality(&item, 1);
  //       printf("%d %d\n", item.sellIn, item.quality);
  //     }
  //   }

  //   printf("\n");
  // }

  struct Spec {
    const char *name;
    const int sell_in;
    const int quality;
  } pairwise[] = {
      // ../jenny/jenny 4 3 4 | sed -f jenny.sed
      {names[0], -1, 1},
      {"Aged Brie", 0, 50},
      {"Backstage passes to a TAFKAL80ETC concert", 11, 0},
      {"Sulfuras, Hand of Ragnaros", -1, 49},
      {"name", 0, 0},
      {"name", 11, 50},
      {"Aged Brie", -1, 0},
      {"Backstage passes to a TAFKAL80ETC concert", -1, 50},
      {"Sulfuras, Hand of Ragnaros", 0, 1},
      {"name", 0, 49},
      {"Aged Brie", 11, 49},
      {"Backstage passes to a TAFKAL80ETC concert", 0, 49},
      // {"Sulfuras, Hand of Ragnaros", 11, 50},
      // {"Aged Brie", 11, 1},
      {"Backstage passes to a TAFKAL80ETC concert", -1, 1},
      // {"Sulfuras, Hand of Ragnaros", -1, 0},
  };

  for (const struct Spec *spec = pairwise; spec < E(pairwise); spec++) {
    init_item(&item, spec->name, spec->sell_in, spec->quality);

    printf("%s %d %d -> ", item.name, item.sellIn, item.quality);
    update_quality(&item, 1);
    printf("%d %d\n", item.sellIn, item.quality);
  }
}