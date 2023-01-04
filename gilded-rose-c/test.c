#include <stdio.h>

#include "./GildedRose.h"

int main() {
  Item item;
  init_item(&item, "name", 0, 0);

  printf("hello %s\n", item.name);
}