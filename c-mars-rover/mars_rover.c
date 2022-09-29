#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include "mars_rover.h"

void *next_newline(const char *input);

const char *get_line(const char *from, int line_number);

const char *follow_single_instruction(char *position, char instruction);

int is_empty(const char *buffer);

int get_number_of_rovers(const char *input);

char *move_rover(const char *input, int rover_numer);

void join_to_buffer(char *buffer, const char *str, const char *d);

const char *mars_rover(const char *input) {
    char buffer[100] = {0};

    int number_of_rovers = get_number_of_rovers(input);

    for (int rover_numer = 0; rover_numer < number_of_rovers; ++rover_numer) {
        char *final_rover_position = move_rover(input, rover_numer);

        join_to_buffer(buffer, final_rover_position, "\n");
    }

    return strdup(buffer);
}

void join_to_buffer(char *buffer, const char *str, const char *d) {
    const char *delimiter = is_empty(buffer) ? "" : d;

    sprintf(buffer, "%s%s%s", buffer, delimiter, str);
}

char *move_rover(const char *input, int rover_numer) {
    char *position = (char *) get_line(input, 2 * rover_numer + 1);
    const char *instructions = get_line(input, 2 * rover_numer + 2);

    for (char *instruction = (char *) instructions; *instruction != '\0'; instruction++) {
        char *new_position = (char *) follow_single_instruction( position, *instruction);
        free((void *) position);
        position = new_position;
    }

    free((void *) instructions);
    return  position;
}

int get_number_of_rovers(const char *input) {
    int newlines = 0;

    for (char *c = (char *) input; *c != '\0'; c++) {
        if (*c == '\n') {
            newlines++;
        }
    }

    int number_of_rovers = newlines / 2;

    return number_of_rovers;
}

int is_empty(const char *buffer) { return !buffer[0]; }

char get_orientation(const char *position) {
    return position[strlen(position) - 1];
}

int get_x(const char *position) {
    int x = 0;

    for (char *c = (char *) position; *c != ' '; c++) {
        x *= 10;
        x += *c - '0';
    }

    return x;
}

int get_y(const char *position) {
    int y = 0;

    for (char *c = memchr(position, ' ', strlen(position)) + 1; *c != ' '; c++) {
        // with each digit - we multiply by 10
        y *= 10;
        y += *c - '0';
    }

    return y;
}

const char *follow_single_instruction(char *position, char instruction) {
    int x = get_x(position);
    int y = get_y(position);
    char o = get_orientation(position);

    char buffer[20];

    switch (instruction) {
        default:
        case 'N':
            switch (o) {
                default:
                case 'N':
                    sprintf(buffer, "%d %d %c", x, y + 1, o);
                    break;
                case 'S':
                    sprintf(buffer, "%d %d %c", x, y - 1, o);
                    break;
                case 'E':
                    sprintf(buffer, "%d %d %c", x + 1, y, o);
                    break;
                case 'W':
                    sprintf(buffer, "%d %d %c", x - 1, y, o);
                    break;
            }
            break;
        case 'L':
            switch (o) {
                default:
                case 'N':
                    sprintf(buffer, "%d %d %c", x, y, 'W');
                    break;
                case 'S':
                    sprintf(buffer, "%d %d %c", x, y, 'E');
                    break;
                case 'E':
                    sprintf(buffer, "%d %d %c", x, y, 'N');
                    break;
                case 'W':
                    sprintf(buffer, "%d %d %c", x, y, 'S');
                    break;
            }
            break;
        case 'R':
            switch (o) {
                default:
                case 'N':
                    sprintf(buffer, "%d %d %c", x, y, 'E');
                    break;
                case 'S':
                    sprintf(buffer, "%d %d %c", x, y, 'W');
                    break;
                case 'E':
                    sprintf(buffer, "%d %d %c", x, y, 'S');
                    break;
                case 'W':
                    sprintf(buffer, "%d %d %c", x, y, 'N');
                    break;
            }
            break;
    }

    return strdup(buffer);
}


const char *get_line(const char *from, int line_number) {

    char *line_start = (char *) from;

    for (int i = 0; i < line_number; ++i) {
        line_start = next_newline(line_start) + 1;
    }

    char *line_end = next_newline(line_start);

    return strndup(line_start, line_end - line_start);
}

void *next_newline(const char *input) { return memchr(input, '\n', strlen(input)); }
