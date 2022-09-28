#include <stdio.h>
#include <string.h>

#include "mars_rover.h"
// exposed for testing only
#include "mars_rover_utils.h"

const char *get_initial_rover_position(const char *input);
const char *get_instructions(const char *input);
const char *get_input_line(const char *input, unsigned line_number);
const char *next_newline_or_eos(const char *str);
const char *follow_single_instruction(const char *from_position,
                                      char instruction);
const char *follow_instructions(const char *from_position,
                                const char *instructions);

const char *mars_rover(const char *input) {
  char *rover_input = (char *)(next_newline_or_eos(input) + 1);

  static char ret[100];
  ret[0] = '\0';

  int first = 1;

  do {
    const char *position = (char *)get_input_line(rover_input, 0);
    const char *instructions = (char *)get_input_line(rover_input, 1);

    if (!first) {
      strcat(ret, "\n");
    }
    first = 0;

    strcat(ret, follow_instructions(position, instructions));

    rover_input = (char *)(next_newline_or_eos(rover_input) + 1);
    rover_input = (char *)(next_newline_or_eos(rover_input) + 1);
  } while (*(rover_input - 1) != '\0');

  return strdup(ret);
}

const char *follow_instructions(const char *from_position,
                                const char *instructions) {
  char *pos = (char *)strdup(from_position);

  for (char *instruction = (char *)instructions; *instruction != '\0';
       instruction++) {
    pos = (char *)follow_single_instruction(pos, *instruction);
  }

  return pos;
}

const char *follow_single_instruction(const char *from_position,
                                      char instruction) {
  const int _x = x(from_position);
  const int _y = y(from_position);
  const char _o = orientation(from_position);

  switch (instruction) {
  default:
  case 'M':
    switch (_o) {
    default:
    case 'N':
      return format_position(_x, _y + 1, _o);
    case 'E':
      return format_position(_x + 1, _y, _o);
    case 'S':
      return format_position(_x, _y - 1, _o);
    case 'W':
      return format_position(_x - 1, _y, _o);
    }
  case 'L':
    switch (_o) {
    default:
    case 'N':
      return format_position(_x, _y, 'W');
    case 'E':
      return format_position(_x, _y, 'N');
    case 'S':
      return format_position(_x, _y, 'E');
    case 'W':
      return format_position(_x, _y, 'S');
    }
  case 'R':
    switch (_o) {
    default:
    case 'N':
      return format_position(_x, _y, 'E');
    case 'E':
      return format_position(_x, _y, 'S');
    case 'S':
      return format_position(_x, _y, 'W');
    case 'W':
      return format_position(_x, _y, 'N');
    }
  }
}

const char *format_position(const int x, const int y, const char orientation) {
  static char buffer[20];

  sprintf(buffer, "%d %d %c", x, y, orientation);

  return strdup(buffer);
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
