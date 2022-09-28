#include "./catch_amalgamated.hpp"

using namespace Catch::Matchers;

extern "C" {
#include "mars_rover.h"
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
