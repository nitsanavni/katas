#include <stdio.h>

typedef struct tupple {
  struct tupple *self;
  char *(*get)();
} tupple_t;

char *a() {
  static char ret[] = "hello2";

  return ret;
}

typedef struct {
  char *(*get)();
  char *s;
} get_t;

get_t *make_get_for(char *s) {}

int main(void) {
  char s1[] = "s1";
  char s2[] = "s2";

  get_t g1 = {a, "g1"};
  get_t g2 = {a, "g2"};

  printf("%s\n", g1.get());
  printf("%s\n", g2.get());
}