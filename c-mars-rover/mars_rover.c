#include "mars_rover.h"
#include <string.h>

const char *parse_initial_rover_position(const char *input);

const char *next_newline_or_eos(const char *str);

const char *mars_rover(const char *input) {
  const char *position_string = parse_initial_rover_position(input);

  return position_string;
}

const char *parse_initial_rover_position(const char *input) {
  const char *newline = next_newline_or_eos(input);

  if (*newline == '\0') {
    return "";
  }

  const char *start = newline + 1;
  const char *end = next_newline_or_eos(start);

  return strndup(start, end - start);
}

const char *next_newline_or_eos(const char *str) {
  char *position_start = (char *)str;

  for (; *position_start != '\n' && *position_start != '\0'; position_start++) {
  }

  return position_start;
}
