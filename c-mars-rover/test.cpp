#include "./catch_amalgamated.hpp"

using namespace Catch::Matchers;

extern "C" {
#include "mars_rover.h"
}

// Test Input:
// 5 5
// 1 2 N
// LMLMLMLMM
// 3 3 E
// MMRMMRMRRM
// Expected Output:
// 1 3 N
// 5 1 E

TEST_CASE("failing test: hello mars rover") {
    CHECK_THAT(mars_rover_hello(), Equals("Hello from Earth!"));
}
