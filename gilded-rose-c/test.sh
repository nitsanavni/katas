# build
cc -g -Wall -Wextra -ftest-coverage -fprofile-arcs test.c GildedRose.c

# verify
./a.out | bash verify.sh -t gilded-rose

# coverage
gcov -b GildedRose.c | grep executed
