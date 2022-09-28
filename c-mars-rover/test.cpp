#include "./catch_amalgamated.hpp"

using namespace Catch::Matchers;

extern "C" {
#include "mars_rover.h"
}

TEST_CASE("Mars Rover - example from web") {
  CHECK_THAT(mars_rover(R"(5 5
1 2 N
LMLMLMLMM)"),
             Equals("1 3 N"));
}
