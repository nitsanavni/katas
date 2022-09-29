#ifndef MARS_ROVER_H_
#define MARS_ROVER_H_

const char *mars_rover(const char *input);

// exposed for testing only
int get_y(const char *position);

int get_x(const char *position);

char get_orientation(const char *position);

#endif // MARS_ROVER_H_