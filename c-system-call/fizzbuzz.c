#include <stdio.h>
#include <stdlib.h>

char *fizzbuzz(int n) {
  char *ret = malloc(10);

  sprintf(ret, "%d", n);

  return ret;
}