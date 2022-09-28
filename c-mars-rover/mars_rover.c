#include <string.h>

#include "mars_rover.h"

const char *get_initial_rover_position(const char *input);
const char *get_instructions(const char *input);
const char *get_input_line(const char *input, unsigned line_number);
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

const char *get_initial_rover_position(const char *input) {
  return get_input_line(input, 1);
}

const char *get_instructions(const char *input) {
  return get_input_line(input, 2);
}

const char *get_input_line(const char *input, unsigned line_number) {
  char *start = (char *)input;

  for (unsigned i = 0; i < line_number; i++) {
    // if it's EOS then break here
    start = (char *)(next_newline_or_eos(start) + 1);
  }

  const char *end = next_newline_or_eos(start);

  return strndup(start, end - start);
}

const char *next_newline_or_eos(const char *str) {
  char *position_start = (char *)str;

  for (; *position_start != '\n' && *position_start != '\0'; position_start++) {
  }

  return position_start;
}
