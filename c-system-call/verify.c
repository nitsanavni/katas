#include <stdio.h>
#include <stdlib.h>

int verify(const char *test, const char *received) {
  static char command[50000];

  sprintf(command, "python -m approvaltests -t '%s' -r '%s'", test, received);

  return system(command);
}
