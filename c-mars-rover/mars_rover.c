#include <string.h>

#include "mars_rover.h"

const char *get_initial_rover_position(const char *input);
const char *get_instructions(const char *input);

const char *next_newline_or_eos(const char *str);

const char *mars_rover(const char *input) {
  const char *position = get_initial_rover_position(input);
  const char *instructions = get_instructions(input);

  char *pos = strdup(position);

  if (strlen(instructions)) {
    // huge hack - what if x, y have more digits?
    ++pos[2];
  }

  return pos;
}

// extract get_input_line? / tokenize
const char *get_initial_rover_position(const char *input) {
  const char *newline = next_newline_or_eos(input);

  if (*newline == '\0') {
    return "";
  }

  const char *start = newline + 1;
  const char *end = next_newline_or_eos(start);

  return strndup(start, end - start);
}

const char *get_instructions(const char *input) {
  const char *newline = next_newline_or_eos(input);

  if (*newline == '\0') {
    return "";
  }

  const char *second_newline = next_newline_or_eos(newline + 1);

  if (*newline == '\0') {
    return "";
  }

  const char *start = second_newline + 1;
  const char *end = next_newline_or_eos(start);

  return strndup(start, end - start);
}

const char *next_newline_or_eos(const char *str) {
  char *position_start = (char *)str;

  for (; *position_start != '\n' && *position_start != '\0'; position_start++) {
  }

  return position_start;
}
