#define DOCTEST_CONFIG_IMPLEMENT_WITH_MAIN
#include "doctest.h"
#include <iostream> // std::cout
#include <sstream>  // std::stringstream
#include <string>   // std::string

extern "C" {
#include "fizzbuzz.h"
#include "verify.h"
}

const char *fizzbuzz_str() {
  std::stringstream ss;

  for (int i = 0; i < 100; i++) {
    ss << i << ": " << fizzbuzz(i) << "\n";
  }

  const std::string &str = ss.str();
  return strdup(str.c_str());
}

TEST_CASE("approvals from C") {
  CHECK(verify("appr from C", fizzbuzz_str()) == 0);
}
