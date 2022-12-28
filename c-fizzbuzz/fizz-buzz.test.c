#include <stdio.h>
#include <string.h>

typedef struct {
  int d;
  const char *code;
} spec_t;

spec_t specs[] = {{.d = 3, .code = "Fizz"},
                  {.d = 5, .code = "Buzz"},
                  {.d = 7, .code = "Whizz"}};

int is_multiple(int n, int of) { return n % of == 0; }

void fizzbuzz(char *output, int n) {
  output[0] = '\0';

  for (spec_t *spec = specs; spec < specs + 3; spec++) {
    if (is_multiple(n, spec->d)) {
      // append the code
      strcat(output, spec->code);
    }
  }

  int no_divisors = output[0] == '\0';

  if (no_divisors) {
    sprintf(output, "%d", n);
  }
}

int main(void) {
  for (int n = 1; n <= 35; n++) {
    char buf[20];
    fizzbuzz(buf, n);
    printf("%d -> %s\n", n, buf);
  }
}
