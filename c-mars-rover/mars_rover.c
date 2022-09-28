#include <string.h>

#include "mars_rover.h"
// exposed for testing only
#include "mars_rover_utils.h"

const char *get_initial_rover_position(const char *input);
const char *get_instructions(const char *input);
const char *get_input_line(const char *input, unsigned line_number);
const char *next_newline_or_eos(const char *str);

const char *mars_rover(const char *input) {
  const char *position = get_initial_rover_position(input);
  const char o = orientation(position);
  const char *instructions = get_instructions(input);

  char *pos = strdup(position);

  if (strlen(instructions)) {
    switch (o) {
    case 'N':
      ++pos[2];
      break;
    default:
      ++pos[0];
    }
  }

  return pos;
}

int x(const char *position) {
  int ret = 0;

  for (char *it = (char *)position; *it != ' '; it++) {
    ret *= 10;
    ret += *it - '0';
  }

  return ret;
}

char orientation(const char *position) {
  return position[strlen(position) - 1];
}

int y(const char *position) {
  int ret = 0;
  const char *start = memchr(position, ' ', strlen(position)) + 1;

  for (char *it = (char *)start; *it != ' '; it++) {
    ret *= 10;
    const int digit_value = *it - '0';
    ret += digit_value;
  }

  return ret;
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
