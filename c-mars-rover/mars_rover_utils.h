#ifndef _MARS_ROVER_UTILS_H_
#define _MARS_ROVER_UTILS_H_

int x(const char *position);
int y(const char *position);
char orientation(const char *position);
const char *format_position(const int x, const int y, const char orientation);

#endif // _MARS_ROVER_UTILS_H_