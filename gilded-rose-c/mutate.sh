#!/bin/bash

# build
clang-12 \
    -fexperimental-new-pass-manager \
    -fpass-plugin=/usr/lib/mull-ir-frontend-12 \
    -g \
    test.c GildedRose.c \
    -o test-gilded-rose;

# mutation test run
mull-runner-12 \
    ./test-gilded-rose \
    -ide-reporter-show-killed \
    --workers=1 \
    --test-program=bash -- -c './test-gilded-rose | bash verify.sh -t gilded-rose -d true';
