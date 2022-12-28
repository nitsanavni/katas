#include <stdio.h>
#include <string.h>

typedef const struct spec {
  const int divisor;
  const char *const code;
} spec_t;

spec_t specs[] = {
    {3, "Fizz"},
    {5, "Buzz"},
    {7, "Whizz"},
    {11, "Bang"},
};

const int num_of_specs = sizeof(specs) / sizeof(specs[0]);

const int is_multiple(const int n, const int of) { return n % of == 0; }

void fizzbuzz(char *const output, const int n) {
  output[0] = '\0';

  for (spec_t *spec = specs; spec < specs + num_of_specs; spec++) {
    if (is_multiple(n, spec->divisor)) {
      // append the code
      strcat(output, spec->code);
    }
  }

  const int no_divisors = output[0] == '\0';

  if (no_divisors) {
    sprintf(output, "%d", n);
  }
}

int main(void) {
  const int least_common_multiple = 3 * 5 * 7 * 11;

  for (int n = 1; n <= least_common_multiple; n++) {
    char result[20];
    fizzbuzz(result, n);
    printf("%d -> %s\n", n, result);
  }
}
