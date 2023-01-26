# jenny
../jenny/jenny -n2 4 3 4 | (echo const int jenny[][3] = {; sed -f indices-jenny.sed;echo }\;;) > jenny.h

# build
cc -g -Wall -Wextra -ftest-coverage -fprofile-arcs test.c GildedRose.c
# cc -g -Wall -Wextra test.c GildedRose.c

# verify
./a.out | bash verify.sh -t gilded-rose

# coverage
gcov -bk GildedRose.c
less -r GildedRose.c.gcov
