#!/bin/bash -i

tmp=mktemp
eval "$1" > $tmp
cp $tmp index.ts
rm $tmp

git add --intent-to-add index.ts

git diff --quiet index.ts \
    && \
        ( \
            echo "*** test passed ***"; \
        ) \
    || \
        ( \
            echo "*** test failed ***"; \
            git add --patch index.ts; \
            false \
        )
