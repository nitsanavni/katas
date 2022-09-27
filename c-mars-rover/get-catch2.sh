curl -L -o catch_amalgamated.hpp https://github.com/catchorg/Catch2/releases/download/v3.1.0/catch_amalgamated.hpp || true
curl -L -o catch_amalgamated.cpp https://github.com/catchorg/Catch2/releases/download/v3.1.0/catch_amalgamated.cpp || true
c++ -c catch_amalgamated.cpp -o catch.o
