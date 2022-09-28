#include "./catch_amalgamated.hpp"

using namespace Catch::Matchers;

extern "C" {
#include "mars_rover.h"
// exposed for testing only
#include "mars_rover_utils.h"
}

TEST_CASE("left") {
  CHECK_THAT(mars_rover(R"(5 5
1 2 N
LM)"),
             Equals("0 2 W"));
}

TEST_CASE("multiple instructions") {
  CHECK_THAT(mars_rover(R"(5 5
1 2 N
MM)"),
             Equals("1 4 N"));
}

TEST_CASE("format position") {
  CHECK_THAT(format_position(1, 12, 'N'), Equals("1 12 N"));
}

TEST_CASE("orientation") {
  CHECK(orientation("1 12 N") == 'N');
  CHECK(orientation("21 123 W") == 'W');
  CHECK(orientation("213 1 S") == 'S');
}

TEST_CASE("y") {
  CHECK(y("1 12 N") == 12);
  CHECK(y("21 123 N") == 123);
  CHECK(y("213 1 N") == 1);
}

TEST_CASE("x") {
  CHECK(x("1 12 N") == 1);
  CHECK(x("21 12 N") == 21);
  CHECK(x("213 12 N") == 213);
}

TEST_CASE("multi-digit coordinates") {
  CHECK_THAT(mars_rover(R"(5 5
1 12 N
M)"),
             Equals("1 13 N"));
}

TEST_CASE("mars_rover: single rover, single instruction") {
  CHECK_THAT(mars_rover(R"(5 5
1 2 N
M)"),
             Equals("1 3 N"));
  CHECK_THAT(mars_rover(R"(5 5
1 2 E
M)"),
             Equals("2 2 E"));
}

TEST_CASE("mars_rover: single rover, no instructions") {
  CHECK_THAT(mars_rover(R"(5 5
1 2 N
)"),
             Equals("1 2 N"));
  CHECK_THAT(mars_rover(R"(5 5
2 2 E
)"),
             Equals("2 2 E"));
}

// TEST_CASE("Mars Rover - example from web") {
//   CHECK_THAT(mars_rover(R"(5 5
// 1 2 N
// LMLMLMLMM)"),
//              Equals("1 3 N"));
// }
