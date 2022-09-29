#include "./catch_amalgamated.hpp"

using namespace Catch::Matchers;

extern "C" {
#include "mars_rover.h"
}


TEST_CASE("different instruction") {
    CHECK_THAT(mars_rover("5 5\n1 12 S\nL"), Equals("1 12 E"));
}

TEST_CASE("different orientation") {
    CHECK_THAT(mars_rover("5 5\n1 12 S\nMM"), Equals("1 10 S"));
}

TEST_CASE("multiple instructions") {
    // moving to the north twice - y += 2
    CHECK_THAT(mars_rover("5 5\n1 12 N\nMM"), Equals("1 14 N"));
    // trice
    CHECK_THAT(mars_rover("5 5\n1 12 N\nMMM"), Equals("1 15 N"));
}

TEST_CASE("get_orientation(position)") {
    CHECK(get_orientation("1 1 N") == 'N');
    CHECK(get_orientation("12 1 S") == 'S');
    CHECK(get_orientation("15 13 W") == 'W');
}

TEST_CASE("get_x(position)") {
    CHECK(get_x("1 1 N") == 1);
    CHECK(get_x("12 1 N") == 12);
    CHECK(get_x("15 13 N") == 15);
}

TEST_CASE("get_y(position)") {
    CHECK(get_y("1 1 N") == 1);
    CHECK(get_y("1 2 N") == 2);
    CHECK(get_y("1 22 N") == 22);
    CHECK(get_y("12 223 N") == 223);
}

TEST_CASE("multi-digit y coordinate", "[.]") {
    // move once to the north - increment y
    CHECK_THAT(mars_rover("5 5\n1 12 N\nM"), Equals("1 13 N"));
}

TEST_CASE("single instruction - M") {
    // move once to the north - increment y
    CHECK_THAT(mars_rover("5 5\n1 2 N\nM"), Equals("1 3 N"));
}

TEST_CASE("single rover, no instructions - doesn't move") {
    CHECK_THAT(mars_rover("5 5\n1 2 N\n"), Equals("1 2 N"));
}

TEST_CASE("example input from the site") {
    CHECK_THAT(mars_rover("5 5\n"
                          "1 2 N\n"
                          "LMLMLMLMM\n"
                          "3 3 E\n"
                          "MMRMMRMRRM"), Equals("1 3 N\n"
                                                "5 1 E"));
}
