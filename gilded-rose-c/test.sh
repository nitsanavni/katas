# build
# cc -g -Wall -Wextra -ftest-coverage -fprofile-arcs test.c GildedRose.c
cc -g -Wall -Wextra test.c GildedRose.c

# verify
./a.out | bash verify.sh -t gilded-rose

# coverage
# gcov -b GildedRose.c | grep executed
# code GildedRose.c.gcov
