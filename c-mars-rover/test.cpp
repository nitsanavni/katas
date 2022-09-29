#include "./catch_amalgamated.hpp"

using namespace Catch::Matchers;

extern "C" {
#include "mars_rover.h"
}

TEST_CASE("should fail: hello mars rover") {
    CHECK_THAT(mars_rover_hello(), Equals("Hello from Earth!"));
}
